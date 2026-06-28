import type { Request, Response } from "express";
import type { NextFunction } from "express-serve-static-core";
import { checkJWTSession } from "../libs/sessions";
import { validatePasswordInput } from "@repo/validation";



export async function resetPasswordMiddleware(req: Request, res: Response, next: NextFunction) {

    // check inputs, check cookie, validate requested email is same as in cookie

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
    // validate cookie
    const token = req.cookies.forgotPasswordToken;
    if (!token) return res.status(401).json({ error: "Session not found" });

    const data = await checkJWTSession(token);
    if (!data) return res.status(401).json({ error: "Invalid session" });

    if (data.email !== email) { // also handle email input validation
        return res.status(403).json({ error: "Unauthorized email, Please reset attempt" });
    }

    return next();

}