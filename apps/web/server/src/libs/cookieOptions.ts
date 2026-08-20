import { NODE_ENV } from "./utils/envVariables";

export const cookieOptions = {
    httpOnly: true,
    sameSite: NODE_ENV === "production" ? "none" as "none" : "lax" as "lax",
    secure: NODE_ENV === "production"
};