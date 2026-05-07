import type { Context } from "hono";
import { embeddingModel } from "../models/embeddingModel";
import { chatQueryValidator } from "@repo/validation"

export const embeddingGeneratorForData = async (c: Context) => {

    try {
        const body = await c.req.json(); // convert the req in json
        const { title, url, description, tags } = body;

        // can use even contentZod (need)
        // server will validate the query present or not
        //but validating again for saftey
        if (!title && !url) return c.json({ message: "Title and url is required for embedding", type: "error" }, 404);

        const safeDescription = description ?? "";
        const safeTags = Array.isArray(tags) ? tags.join(', ') : "";

        const query = `title: ${title} | url: ${url}| description: ${safeDescription}| tags: ${safeTags}`

        const vectorResponse = await embeddingModel.embedQuery(query);

        //  console.log(vectorResponse);

        const slicedVector = vectorResponse.slice(0, 768);// using 768 dimensions in database

        console.error(slicedVector)
        return c.json({
            type: "success",
            message: "Embedding generated successfully",
            embeddingVector: slicedVector
        }, 200)

    } catch (error) {

        console.error("Embedding Error in embeddingGeneratorForData---", error)

        return c.json({ message: "Failed to generate embedding for Data", type: "error" }, 500)
    }

}



export const embeddingGeneratorForQuery = async (c: Context) => {

    try {

        const { query }: { query: string } = await c.req.json();
        if (!query) return c.json({ type: "error", message: "Query not found" }, 404)
        // server will validate the query present or not
        //but validating again for saftey
        const result = chatQueryValidator(query);


        if (!result.success) {
            const message = result.error.issues[0]?.message || "Invalid query"
            console.error(message);
            return c.json({ message, type: "error" }, 400);
        }

        // now generate embedds for the query
        const vectorResponse = await embeddingModel.embedQuery(`userQuery:${query}`);

        const slicedVector = vectorResponse.slice(0, 768); //using 768 dimension in content table in db

        console.error(slicedVector);

        return c.json({ type: "success", message: "Query embedd generated successfully", embeddingVector: slicedVector }, 200)


    } catch (error) {


        console.error("Embedding Error in embeddingGeneratorForQuery---", error)

        return c.json({ type: "error", message: "Failed to generate embedding for Query" }, 500)
    }
}