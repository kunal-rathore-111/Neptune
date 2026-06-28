import type { NextFunction, Request, Response } from "express";

export function validateOtpInputMiddleware(req: Request, res: Response, next: NextFunction) {

    const { email, otp, type } = req.body;

    //    console.error(email, 'k', typeof otp, 'k', type, 'v');


    if (((!email && 'string' !== typeof email)
        || (!otp && 'string' !== typeof otp)
        || (!type && 'string' !== typeof type))
        || ('forgotPassword' !== type && 'createAccount' !== type))
        return res.status(400).json({ error: "Invalid input" });

    return next();
}