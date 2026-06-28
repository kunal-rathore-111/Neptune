import type { NextFunction, Request, Response } from "express";



export function emailOtpInputMiddleware(req: Request, res: Response, next: NextFunction) {

    const { email, type } = req.body;

    if (!email || typeof email !== 'string' || !type || typeof type !== 'string'
        || (type !== 'forgotPassword' && type !== "createAccount"))
        return res.status(400).json({
            error: "Invalid input"
        })

    next();
}