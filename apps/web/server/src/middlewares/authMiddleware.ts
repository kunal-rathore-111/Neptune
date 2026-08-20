
import type { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import { checkJWTSession } from "../libs/sessions";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.cookies?.token;
    // Throw 401 AppError so errorMiddleware catches it and automatically clears cookies centrally
    if (!token) throw new AppError("Please Sign-in again", 401, "Unauthorized");
    const decodeOp = await checkJWTSession(token);
    if (decodeOp) {
        req.userId = decodeOp.id as string;
        next();
    } else {
        // Invalid or expired token: errorMiddleware catches this 401 and clears tokens centrally
        throw new AppError("Please Sign-in again", 401, "Unauthorized");
    }

}