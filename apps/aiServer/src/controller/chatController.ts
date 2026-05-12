import type { Context } from 'hono';
import { gorqModel } from '../models/groqModels';

export const chat = async (c: Context) => {
  try {
    const { userQuery, contentData, chatHistory } = await c.req.json();

    if (!userQuery) {
      return c.json({ message: 'User query not found', type: 'error' }, 404);
    }
    // contentData can be null possible if no relevant bookmark found
    //console.log(contentData);

    const context =
      contentData && contentData.length > 0
        ? contentData.map((content: any) => `${JSON.stringify(content)}`).join('\n')
        : 'The user has no relevant bookmarks for this query';

    //console.log(context);

    const messages = [
      {
        role: 'system',
        content: `You are Neptune AI, a premium assistant designed to help users learn from, understand, and explore their personal library of bookmarks.

        ### YOUR PRIMARY TASK:
        - Help users digest and learn from the content they have saved.
        - Fetch and explain data related to the provided bookmarks.
        - Assist in navigating the Neptune project specifically.

        ### CONVERSATIONAL RULES:
        1. **Don't Repeat Yourself**: Do not list all relevant bookmarks in every message. Only list specific items if the user asks for them or if it's essential to the answer.
        2. **Be Direct**: Answer immediately. Avoid repetitive greetings.
        3. **Context Awareness**: Use the chat history to stay in flow.
        4. **Brevity**: Your response MUST be concise. Whatever happens, do NOT exceed 200 words in a single reply.
        5. **Formatting**: Always use standard GitHub Flavored Markdown. When providing a list, use bold numbering (e.g., "**1.** ", "**2.** ") with a space after the period. DO NOT use standard markdown list markers like "1. " or "- " as they might be stripped. Instead, manually type the bold numbers. Ensure there is a blank line BEFORE the list starts.
        6. **Clarity**: Use bold text for titles and clickable links for URLs. Avoid plain text lists without proper markdown markers.

        ### DATA CONTEXT:
        - Relevant Library Items: ${context}
        - Chat History: ${chatHistory}
        
        Note: You are provided with a selection of the most relevant bookmarks from the user's library. This is a subset, so there may be many more bookmarks in the full library that aren't shown here.
        `,
      },
      {
        role: 'human',
        content: userQuery,
      },
    ];
    const aiResponse = await gorqModel.invoke(messages);

    console.log(aiResponse.content);

    return c.json(
      {
        type: 'success',
        message: aiResponse.content,
      },
      200,
    );
  } catch (error) {
    console.error('chatController---', error);
    return c.json(
      {
        type: 'error',
        message: 'Chat failed ',
      },
      500,
    );
  }
};
