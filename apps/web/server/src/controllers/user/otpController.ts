import { ForgotPasswordOTPTable, getDB, SignUpOTPTable, UsersTable } from "@repo/database";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { createJWTSession } from "../../libs/sessions";
import { NODE_ENV } from "../../libs/utils/envVariables";



async function validateOtp(req: Request, res: Response) {

    try {
        const { email, otp, type } = req.body; // already validating in middleware that exists

        const db = getDB();
        // check inputs->
        // find in table using email only->
        // check found->
        //  if notFound-> return error
        //   else->
        //       check attempts and otp->
        //            if incorrect OTP AND less attempts return error,
        //            else more attempts or correct OTP->
        //                   delete the entry->
        //             if more attepts return Error->
        //             else if correct otp redirect->
        //             else return error

        let find = null;
        if (type === "forgotPassword") {
            find = await db
                .select()
                .from(ForgotPasswordOTPTable)
                .where(
                    eq(ForgotPasswordOTPTable.email, email),
                );
        }

        else {                       //type === "createAccount"
            find = await db
                .select()
                .from(SignUpOTPTable)
                .where(
                    eq(SignUpOTPTable.email, email),
                );
        }

        const otpRecord = find[0];

        if (!otpRecord) {
            return res.status(400).json({ error: "Invalid email" });
        }
        else if (otpRecord.attempts < 3 && otp !== otpRecord.otp) {

            if (type === "forgotPassword") {
                await db.update(ForgotPasswordOTPTable).set({ attempts: otpRecord.attempts + 1 }).where(eq(ForgotPasswordOTPTable.email, email));

            }

            else if (type === "createAccount") {
                await db.update(SignUpOTPTable).set({ attempts: otpRecord.attempts + 1 }).where(eq(SignUpOTPTable.email, email));
            }

            return res.status(400).json({ error: "Invalid OTP." })
        }
        else {

            // delete the OTP then check attempts, then check expiry, if all done then redirect or return

            // delete OTP
            if (type === "forgotPassword") {
                await db.delete(ForgotPasswordOTPTable).where(eq(ForgotPasswordOTPTable.email, email));

            }

            else if (type === "createAccount") {
                await db.delete(SignUpOTPTable).where(eq(SignUpOTPTable.email, email));
            }

            // check attempts
            if (otpRecord.attempts >= 3) {
                return res.status(403).json({ error: "Maximum 3 attempts are allowed, please regenerate OTP." })
            }

            if (otpRecord.otp === otp) {

                // check EXPIRY AND REDIRECT
                if (otpRecord.expiresAt > new Date()) {

                    if (type === "forgotPassword") {
                        // add cookie and redirect
                        const session = await createJWTSession({ email, otp });

                        res.cookie('forgotPasswordToken', session, {
                            httpOnly: true,
                            sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // this logic for http (secure true) (none only works with secure true)
                            secure: NODE_ENV === 'production' ? true : false,
                            maxAge: 24 * 60 * 1000 * 60 * 3
                        });

                        res.cookie('hasForgotPasswordCookie', true, {
                            httpOnly: false, // for protected route validation
                        })

                        return res.status(200).json({ redirectURL: `/forgot-password/reset-password?email=${email}` });
                    }

                    else if (type === "createAccount") {

                        const find = await db.update(UsersTable).set({ isVerified: true }).where(eq(UsersTable.email, email)).returning();

                        const user = find[0];

                        if (!user) return res.status(404).json({ error: "User not found" });

                        const session = await createJWTSession({
                            email: user.email,
                            name: user.name,
                            id: user.id
                        });

                        res.cookie('token', session, {
                            httpOnly: true,
                            sameSite: NODE_ENV === "production" ? 'none' : 'lax',
                            secure: NODE_ENV === "production" ? true : false,
                            maxAge: 24 * 60 * 1000 * 60 * 3
                        })
                        res.cookie('hasTokenCookie', true, {
                            httpOnly: false, // for protected route validation
                        })


                        return res.status(200).json({ redirectURL: '/dashboard' });
                    }
                }
                else {
                    return res.status(403).json({ error: "OTP expired." })
                }
            }
            else {
                return res.status(403).json({ error: "Invalid OTP" })
            }
        }

    } catch (error) {
        console.error("Error in validateOTPAction: ", error);

        return res.status(500).json({ error: "Something went wrong in validating OTP, please try again." });
    }
}


export const otpController = { validateOtp }