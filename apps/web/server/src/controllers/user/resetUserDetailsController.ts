import { validatePasswordInput } from "@repo/validation";
import type { Request, Response } from "express";
import { hashPassword } from "../../libs/utils/hashFunc";
import { getDB, UsersTable } from "@repo/database";
import { eq } from "drizzle-orm";
import { NODE_ENV } from "../../libs/utils/envVariables";



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
        res.cookie('forgotPasswordToken', '', {
            expires: new Date(0),
            httpOnly: true,
            sameSite: NODE_ENV === 'production' ? "none" : 'lax',
            secure: NODE_ENV === 'production' ? true : false,
        });
        res.cookie('hasForgotPasswordCookie', '', {
            expires: new Date(0),
            httpOnly: false,
            sameSite: NODE_ENV === 'production' ? "none" : 'lax',
            secure: NODE_ENV === 'production' ? true : false,
        });

        return res.status(200).json({ message: "Password updated successfully." });
    }

    catch (error) {
        console.error("Error in updatePasswordAction: ", error);
        return res.status(500).json({ error: "Something went wrong, Please try again later." })
    }
}

export const updateUserDetailsController = { resetPassword };