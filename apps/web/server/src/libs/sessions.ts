
import * as jose from "jose";

import AppError from '../middlewares/appError';

const jwtSecret = process.env.JWT_SECRET;


if (!jwtSecret) throw new AppError("JWT secret not present.", 404, "JWT secret not found");

const key = new TextEncoder().encode(jwtSecret);


interface jwtInput {
    id?: string
    email: string,
    otp?: string,
    name?: string
}

export const createJWTSession = async (input: jwtInput) => {
    return await new jose.SignJWT({ ...input }).setExpirationTime('3d').setProtectedHeader({ alg: "HS256" }).sign(key); // expire in 3 days
};

export const checkJWTSession = async (token: string) => {
    try {
        const { payload } = await jose.jwtVerify(token, key);
        return payload;
    } catch (error) {
        return null;
    }
};

