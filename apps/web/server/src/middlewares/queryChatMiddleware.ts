import type { NextFunction, Request, Response } from "express";
import AppError from "./appError";
import { chatQueryValidator } from "@repo/validation";

export function queryChatMiddleware(req: Request, res: Response, next: NextFunction) {
    const { userQuery } = req.body;
    const { chatHistory } = req.body;
    if (!userQuery) throw new AppError("User Query not found", 404,
        "Not found"
    )
    if (!chatHistory) throw new AppError("Chat history not found", 404,
        "Not found"
    )

    const result = chatQueryValidator(userQuery);

    if (!result.success) {
        const message = result.error.issues[0]?.message || "Invalid Querys"
        throw new AppError(message, 400, "BadRequest", true)
    }
    req.userQuery = userQuery;

    req.chatHistory = chatHistory.map(
        (content: { role: 'bot' | 'user', content: string }) =>
            content.role + "- " + content.content).join('\n\n'); // coverting to string
    next();

}