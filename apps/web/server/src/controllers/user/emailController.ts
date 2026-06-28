

import { getDB, ForgotPasswordOTPTable, SignUpOTPTable, UsersTable } from "@repo/database";
import { eq } from "drizzle-orm";

import { createTransport } from "nodemailer";

import crypto from "crypto"
import type { Request, Response } from "express";


const transporter = createTransport({
    service: "gmail",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});


async function sendOTP(req: Request, res: Response) {

    try {
        const db = getDB();

        const { email, type } = req.body; // validating inputs in middleware

        // check user present or not
        const findUser = await db.select().from(UsersTable).where(eq(UsersTable.email, email)).limit(1);

        if (type === 'forgotPassword') {
            if (!findUser.length) return res.status(404).json({ error: "User not found, Please sign-up." });
        } else if (type === 'createAccount') {
            if (findUser.length) return res.status(409).json({ error: "User already exists, Please sign-in." });
        }

        // generate OTP
        const otpCode = crypto.randomInt(100000, 1000000).toString();

        // store otp for the user in db and send email
        const currentTime = new Date();
        const newMinutes = currentTime.getMinutes() + 15;
        const extendedTime = currentTime.setMinutes(newMinutes);
        const expiryDate = new Date(extendedTime);

        if ('forgotPassword' === type) {
            //find in db first
            const find = await db
                .select()
                .from(ForgotPasswordOTPTable)
                .where(
                    eq(ForgotPasswordOTPTable.email, email)
                )
                .limit(1);

            if (find.length) {
                await db
                    .update(ForgotPasswordOTPTable)
                    .set(
                        { otp: otpCode, expiresAt: expiryDate }
                    )
                    .where(
                        eq(ForgotPasswordOTPTable.email, email)
                    );
            }
            else {
                await db
                    .insert(ForgotPasswordOTPTable)
                    .values({
                        email: email,
                        otp: otpCode,
                        expiresAt: expiryDate
                    });
            }
        }
        else if ("createAccount" === type) {

            //find in db first
            const find = await db
                .select()
                .from(SignUpOTPTable)
                .where(
                    eq(SignUpOTPTable.email, email)
                )
                .limit(1);

            if (find.length) {
                await db
                    .update(SignUpOTPTable)
                    .set(
                        { otp: otpCode, expiresAt: expiryDate }
                    )
                    .where(
                        eq(SignUpOTPTable.email, email)
                    );
            }
            else {
                await db
                    .insert(SignUpOTPTable)
                    .values({
                        email: email,
                        otp: otpCode,
                        expiresAt: expiryDate
                    });
            }
        }

        const mail = {
            from: `Recon-AI <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Hello, your verification code for Neptune is inside.`,
            html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #333;">Account Verification</h2>
            <p>Your one-time security code is valid for 15 minutes:</p>
            <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111; margin: 20px 0; border-radius: 4px;">
            ${otpCode}
            </div>
            <p style="color: #777; font-size: 12px;">If you didn't request this code, please secure your account immediately.</p>
        </div>`
        }

        await transporter.sendMail(mail);

        return res.status(200).json({ message: "OTP send successfully, please check your mail." })

    } catch (error) {
        console.error("Something went wrong in sendOTP function: ", error);

        return res.status(500).json({ error: "Something went wrong, please try again." })
    }
}

export const emailController = { sendOTP };