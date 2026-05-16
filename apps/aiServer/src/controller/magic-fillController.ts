import type { Context } from "hono";
import * as cheerio from "cheerio"
import { structuredLMForMagicFill } from "../models/groqModels";



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

        const aiResponse = await structuredLMForMagicFill.invoke([prompt]);
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