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
        1. **Don't Repeat Yourself**: Do not list the "Top 5 Bookmarks" in every message. Only list them if the user asks or if it is the very first interaction.
        2. **Be Direct**: Answer immediately. Avoid repetitive greetings.
        3. **Context Awareness**: Use the chat history to stay in flow.

        ### DATA CONTEXT:
        - Relevant Library Items: ${context}
        - Chat History: ${chatHistory}`,
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
