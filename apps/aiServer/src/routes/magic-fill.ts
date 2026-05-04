import { ChatGroq } from '@langchain/groq';
import { Hono } from 'hono';
import z from 'zod';

export const magicRoute = new Hono();

const groqAPI = process.env.GROQ_API;
if (!groqAPI) throw new Error('GROQ_API not found');

const model = new ChatGroq({ model: 'llama-3.1-8b-instant', apiKey: groqAPI, temperature: 0 });
const schemaForOutput = z.object({
  title: z.string().describe('A clean, short title for the webpage'),
  description: z.string().describe('A 1 to 2 sentence summary of the webpage'),
  category: z.enum([
    'Development',
    'Finance',
    'Study',
    'Social',
    'GitHub',
    'Exams',
    'AI',
    'Research',
    'Design',
    'Others',
  ]),
  tags: z.array(z.string()).describe('An array of 2 to 4 relevant tags'),
});

const structuredLM = model.withStructuredOutput(schemaForOutput);
magicRoute.post('/', async (c) => {
  try {
    const body = await c.req.json(); // converts body into json
    const { url }: { url: string } = body;
    const websiteResponse = await fetch(url);
    const htmlText = await websiteResponse.text(); // getHTML of website
    const finalText = htmlText.slice(0, 4000);
    const aiResponse = await structuredLM.invoke(`You are an expert bookmark categorization assistant. 
      Analyze the following website HTML/text and generate metadata for it.
      Return the output strictly in the requested JSON format.
      Website Content:
      ${finalText}`);

    console.log('AI Response-- ', aiResponse);
    return c.json(
      {
        message: aiResponse,
        type: 'success',
      },
      200,
    );
  } catch (error: any) {
    console.error('ERROR--- ', error);
    let message = 'Something went wrong';
    let status = 500;
    if (
      error?.code === 'FailedToOpenSocket' ||
      error?.code === 'ConnectionRefused' ||
      error?.code === 'ERR_INVALID_URL'
    ) {
      message = 'Invalid URL';
      status = 400;
    }
    return c.json(
      {
        message,
        type: 'error',
      },
      status as any,
    );
  }
});
