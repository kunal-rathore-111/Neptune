import { ChatGroq } from "@langchain/groq";
import type { Context } from "hono";
import z from "zod";
import * as cheerio from "cheerio"

const groqAPI = process.env.GROQ_API;
if (!groqAPI) throw new Error('GROQ_API not found in environment config');

const model = new ChatGroq({
    model: 'llama-3.3-70b-versatile',
    apiKey: groqAPI, temperature: 0
});
const schemaForOutput = z.object({
    title: z.string().describe('A clean, short title for the webpage relevant to the title').min(4).max(1000),
    description: z.string().describe('A 1 to 2 sentence summary of the webpage relevant to the post').min(4).max(3000),
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
    ]).describe("The category of the webpage. You MUST pick from the list. If it doesn't fit perfectly, use 'Others'."),
    tags: z.array(z.string().max(50)).describe('An array of 2 to 4 relevant tags'),
});

const structuredLM = model.withStructuredOutput(schemaForOutput);

export const magicFillController = async (c: Context) => {
    try {
        const { url } = await c.req.json();
        const websiteResponse = await fetch(url);
        const htmlText = await websiteResponse.text();


        const $ = cheerio.load(htmlText);
        const title = $("title").text(); //find title tag and get it's text
        const metaDesc = $('meta[name="description"]').attr("content") || "";
        const body = $('body').text();

        const cleanedBody = body  //!! ai generated
            .replace(/\s+/g, " ")
            .slice(0, 2000);

        const prompt = `
You are a strict metadata extraction system.

Your task:
Extract metadata from the given webpage text and return ONLY valid JSON that matches the required schema.

Rules:
- Do NOT include any explanation or extra text
- Do NOT repeat keys
- Title must be short and clean (max 1 line)
- Description must be 1–2 sentences only
- Category MUST be exactly one of:
  Development, Finance, Study, Social, GitHub, Exams, AI, Research, Design, Others
- Tags must be 2 to 4 relevant keywords (no duplicates)
- Remove irrelevant text like "Skip to main content", navigation, or language lists
- If unsure, choose the closest valid category or "Others"

Input:
Title: ${title}
Meta Description: ${metaDesc}
Content: ${cleanedBody}
`;

        const aiResponse = await structuredLM.invoke(prompt);
        console.log('AI Response on magic fill-- ', aiResponse);
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
};