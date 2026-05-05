import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import type { Context } from "hono";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY not found in environment config")


const embeddingModel = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-2",
    apiKey: GOOGLE_API_KEY,
})

export const embeddingController = async (c: Context) => {

    try {
        const body = await c.req.json(); // convert the req in json
        const { title, url, description, tags } = body;
        // can use even contentZod (need)
        if (!title && !url) return c.json({ message: "Title and url is required for embedding", type: "error" }, 404);

        const safeDescription = description ?? "";
        const safeTags = Array.isArray(tags) ? tags.join(', ') : "";

        const query = `title: ${title} | url: ${url}| description: ${safeDescription}| tags: ${safeTags}`

        const vectorResponse = await embeddingModel.embedQuery(query);

        //  console.log(vectorResponse);

        const slicedVector = vectorResponse.slice(0, 768);// using 768 dimensions in database


        return c.json({
            type: "success",
            message: "Embedding generated successfully",
            embeddingVector: slicedVector
        }, 200)

    } catch (error) {

        console.error("Embedding Error- ", error)

        return c.json({ message: "Failed to generate embedding", type: "error" }, 500)
    }

}
