import type { Request, Response } from "express";
import { hashPassword } from "../../libs/utils/hashFunc";
import { getDB, UsersTable } from "@repo/database";
import { eq } from '@repo/database';
import { cookieOptions } from "../../libs/cookieOptions";



export async function resetPassword(req: Request, res: Response) {

    const { email, password } = req.body; // vlidating in middleware and forgotPassword cookie too


    try {

        // delete cookie-> hashPass-> store in db
        const hashedPassword = await hashPassword(password);
        const db = getDB();
        await db.
            update(UsersTable)
            .set({ password: hashedPassword })
            .where(eq(UsersTable.email, email));

        // Clear the token cookie so it can't be reused!
        res.clearCookie('forgotPasswordToken', cookieOptions);
        res.clearCookie('hasForgotPasswordCookie', { ...cookieOptions, httpOnly: false });



        return res.status(200).json({ message: "Password updated successfully." });
    }

    catch (error) {
        console.error("Error in updatePasswordAction: ", error);
        return res.status(500).json({ error: "Something went wrong, Please try again later." })
    }
}

export const updateUserDetailsController = { resetPassword };