import { ChatGroq } from "@langchain/groq";
import { groqAPI } from "../config/env.variables";
import z from "zod";
import { CATEGORIES } from "@repo/libs";

export const gorqModel = new ChatGroq({
    model: 'llama-3.3-70b-versatile',
    apiKey: groqAPI, temperature: 0
});

const schemaForMagicFill = z.object({
    title: z.string().describe('A clean, short title for the webpage').max(1000).default(''),
    description: z.string().describe('A 1 to 2 sentence summary of the webpage. Leave empty if the page has no meaningful content.').max(3000).default(''),
    category: z.enum(CATEGORIES).describe(
        "The category of the webpage. You MUST pick the single most relevant category from the list. If it doesn't fit any perfectly, use 'Others'."
    ),
    tags: z.array(z.string().max(50)).describe('An array of 2 to 4 relevant tags. Return empty array if no tags apply.'),
});


export const structuredLMForMagicFill = gorqModel.withStructuredOutput(schemaForMagicFill);
