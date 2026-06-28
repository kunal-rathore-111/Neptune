import { ExpressAuth } from "@auth/express";
import Discord from "@auth/express/providers/discord";
import GitHub from "@auth/express/providers/github";
import Google from "@auth/express/providers/google";
import type { NextFunction, Request, Response } from "express";
import { AccountsTable, getDB, UsersTable } from '@repo/database';
import { and, eq } from "drizzle-orm";
import AppError from "./appError";
import { createJWTSession } from "../libs/sessions";
import { NODE_ENV } from "../libs/utils/envVariables";



export function OAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHandler = ExpressAuth({
        providers: [GitHub, Google, Discord],
        callbacks:
        {
            async signIn({ user, account }) {
                try {
                    const db = getDB();
                    if (!user.email || !account) return false;

                    else {
                        let userId: string;
                        const find = await db.select().from(AccountsTable).where(and(
                            eq(AccountsTable.provider, account.provider),
                            eq(AccountsTable.providerAccountId, account.providerAccountId))
                        ).limit(1);

                        if (find[0]) userId = find[0]?.userId;
                        else {
                            const find = await db.select().from(UsersTable).where(
                                eq(UsersTable.email, user.email)).limit(1);

                            if (find[0]) userId = find[0].id;
                            else { // not present in usersTable too 

                                const newUser = await db.insert(UsersTable).values({
                                    email: user.email,
                                    name: user.name || "unknown",
                                    isVerified: true,
                                    image: user.image,
                                }).returning();

                                if (!newUser[0]) throw new AppError("Failed to create user", 500, "Failed");
                                userId = newUser[0].id;
                            }

                            // create entry in accounts table in both cases (present in usersTable, not present in usersTable)
                            await db.insert(AccountsTable).values({
                                userId: userId,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId
                            })
                        }
                        const token = await createJWTSession({ email: user.email, id: userId, name: user.name || "unknown", image: user.image ?? "" });
                        res.cookie('token', token, {
                            maxAge: 3 * 24 * 60 * 60 * 1000,
                            httpOnly: true,
                            sameSite: NODE_ENV === "production" ? "none" : 'lax',
                            secure: NODE_ENV === "production" ? true : false,
                        });

                        res.cookie('hasTokenCookie', true, {
                            maxAge: 3 * 24 * 60 * 60 * 1000,
                            httpOnly: false,
                            sameSite: NODE_ENV === "production" ? "none" : 'lax',
                            secure: NODE_ENV === "production" ? true : false,
                        })
                        return true;

                    }
                } catch (error) {
                    console.error("OAuth failed: ", error);
                    return false;
                }


            },
            async redirect({ url }) {
                // any invalid frontends, postman will dirctly blocked by CORS in production
                const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

                if (url.startsWith(FRONTEND_URL)) {
                    return url;
                }
                return FRONTEND_URL;
            }
        }
    });

    return authHandler(req, res, next);
}
