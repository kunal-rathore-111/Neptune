
import type { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import { checkJWTSession } from "../libs/sessions";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req?.cookies?.token;
    if (!token) throw new AppError("Please Sign-in again", 401, "Unauthorized");
    const decodeOp = await checkJWTSession(token);
    if (decodeOp) {
        req.userId = decodeOp.id;
        next();
    }
    else throw new AppError("Please Sign-in again", 401, "Unauthorized");
}