import type { NextFunction, Request, Response } from "express";




export const checkBothPasswordsDiff_MW = (req: Request, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;
    if (password === newPassword) {
        return res.status(403).send({ message: "Old and new passowrd cannot be same" })
    }
    next();
}