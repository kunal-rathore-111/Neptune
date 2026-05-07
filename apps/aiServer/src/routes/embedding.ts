import { Hono } from "hono";
import { embeddingGeneratorForData, embeddingGeneratorForQuery } from "../controller/embeddingController";



export const embeddingRoute = new Hono();


embeddingRoute.post('/generate-for-data', embeddingGeneratorForData)
embeddingRoute.post('/generate-for-query', embeddingGeneratorForQuery)