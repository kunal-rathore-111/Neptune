import { Hono } from "hono";
import { embeddingController } from "../controller/embeddingController";



export const embedding = new Hono();


embedding.post('/', embeddingController)