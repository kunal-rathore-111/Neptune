import type { Context } from 'hono';
import { gorqModel } from '../models/groqModels';

type chatBodyType = {
  userQuery: string;
  contentData?: {
    id: string;
    title: string;
    description: string | null;
    link: string | null;
    category:
      | 'Development'
      | 'Finance'
      | 'Study'
      | 'Social'
      | 'GitHub'
      | 'Exams'
      | 'AI'
      | 'Research'
      | 'Design'
      | 'Others';
    tags: string[] | null;
    userId: string;
    createdDate: Date;
    updatedDate: Date;
  }[];
};
export const chat = async (c: Context) => {
  try {
    let { userQuery, contentData } = await c.req.json();
    if (!userQuery) {
      return c.json({ message: 'User query not found', type: 'error' }, 404);
    } // contentData can be null possible if no relevant bookmark found
    console.log(contentData);
    const context =
      contentData && contentData.length > 0
        ? contentData.map((content: any) => `${JSON.stringify(content)}`).join('\n')
        : 'The user has no relevant bookmarks for this query';

    //console.log(context);

    const messages = [
      {
        role: 'system',
        content: `You are Neptune AI, a specialized assistant for managing and exploring the user's personal library of links and bookmarks.
        ### STRICT RULES:
        1. ONLY assist with questions about the user's library and the Neptune project.
        2. NEVER help with general academic assignments (math, science, history, etc.) or any off topic.
        3. If the content is unclear message according to that. 
        4. If a user asks for help with anything outside of their library or Neptune, politely say sorry, with message of giving context with what you can help. Or SIMILAR BUT DO NOT HELP WITH ANY QUERY WHICH IS NOT RELEVANT TO THE CONTENT"
        5. Use the context below to provide answers. If the information isn't there, do not make it up.
        6. And keep response short if possible.
        7. Do not include the context in response message if it's irrelevant and no any '\' if present bw the context
        ### USER LIBRARY CONTEXT:
        ${context}`,
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
