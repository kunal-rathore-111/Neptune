import { Hono } from "hono";
import { embeddingGeneratorForData, embeddingGeneratorForQuery } from "../controller/embeddingController";



export const embedding = new Hono();


embedding.post('/generate-for-data', embeddingGeneratorForData)
embedding.post('/generate-for-query', embeddingGeneratorForQuery)