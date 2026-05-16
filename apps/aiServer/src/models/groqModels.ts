import { ChatGroq } from "@langchain/groq";
import { groqAPI } from "../config/env.variables";
import z from "zod";

export const gorqModel = new ChatGroq({
    model: 'llama-3.3-70b-versatile',
    apiKey: groqAPI, temperature: 0
});
const schemaForMagicFill = z.object({
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


export const structuredLMForMagicFill = gorqModel.withStructuredOutput(schemaForMagicFill); // for magic fill
