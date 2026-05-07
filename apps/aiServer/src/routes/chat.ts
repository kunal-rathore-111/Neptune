import { Hono } from "hono";
import { chat } from "../controller/chatController";


export const chatRouter = new Hono();

chatRouter.post("/", chat)