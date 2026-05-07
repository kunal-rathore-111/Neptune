import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GOOGLE_API_KEY } from "../config/env.variables";

export const embeddingModel = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-2",
    apiKey: GOOGLE_API_KEY,
})
