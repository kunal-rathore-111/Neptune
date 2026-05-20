import type { contentZodSchema } from "@repo/validation";
import type z from "zod";
import { AI_Server_URL } from "../../utils/envVariables";
import AppError from "../../middlewares/appError";
import axios from "axios";
import { cosineDistance, eq } from "drizzle-orm";
import { ContentTable } from "../../drizzle/schema";
import { db } from "../../config/dbDrizzle";


type aiServerEmbeddingResponseType = {
    type: "success"
    message: string;
    embeddingVector: number[];
}
export const getEmbedding = async (data: z.infer<typeof contentZodSchema>) => {
    try {
        const aiServerFullResponse = await axios(AI_Server_URL + '/embedding/generate-for-data', {
            method: "POST",
            data: (data),
        })
        const aiServerActualResponse: aiServerEmbeddingResponseType = aiServerFullResponse.data;
        // console.error(aiServerActualResponse);
        if (aiServerActualResponse.type === "success") {
            return aiServerActualResponse.embeddingVector
        }
        else {
            throw new AppError("Something went wrong", 500, "EmbeddingGenerationFailed", true); // not giving actually received message cause not good to show embedding failed as error message
        }
    } catch (error) {
        console.error("getEmbedding Error----- ", error)
        throw new AppError("Something went wrong", 500, "getEmbeddingError")
    }
}


export const findEmbeddingService = async (embeddingVector: number[], userId: string) => {
    // if any error will auto capture by appError class
    const distance = cosineDistance(ContentTable.embedding, embeddingVector);
    // find top 5 data of the user's content in the table
    const result = await db.select({
        title: ContentTable.title,
        description: ContentTable.description,
        link: ContentTable.link,
        category: ContentTable.category,
        tags: ContentTable.tags,
        userId: ContentTable.userId,
        createdDate: ContentTable.createdDate,
        updatedDate: ContentTable.updatedDate
    }).from(ContentTable).where(eq(ContentTable.userId, userId)).orderBy(distance).limit(5);
    // console.error(result);

    return result;
}