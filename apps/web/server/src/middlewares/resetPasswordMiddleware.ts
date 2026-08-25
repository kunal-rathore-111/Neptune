import type { Request, Response } from "express";
import type { NextFunction } from "express-serve-static-core";
import { checkJWTSession } from "../libs/sessions";
import { validatePasswordInput } from "@repo/validation";
import AppError from "./appError";

export async function resetPasswordMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if ((!email && 'string' !== typeof email)
        || (!password && 'string' !== typeof password)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const result = validatePasswordInput(password);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues[0]?.message || "Invalid password"
        });
    }

    const token = req.cookies.forgotPasswordToken;
    // throw AppError so errorMiddleware catches it and automatically clears cookies centrally

    if (!token) throw new AppError("Session not found", 401, "Unauthorized");

    const checkJWTSessionResult = await checkJWTSession(token);

    if (!checkJWTSessionResult) {
        throw new AppError("Invalid Session", 401, "Unauthorized");
    }



    if (checkJWTSessionResult.email !== email) { // also handle email input validation
        return res.status(403).json({ error: "Unauthorized email, Please reset attempt" });
    }

    return next();

}