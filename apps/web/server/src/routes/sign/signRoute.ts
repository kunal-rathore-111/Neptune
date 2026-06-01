
// dependencies
import express from "express";


import { signZod } from "../../middlewares/signMiddleware";
import { signInSchema, signUpSchema } from "@repo/validation";
import { signLimiter } from "../../utils/limiter";
import { signInController, signOutController, signUpController } from "../../controllers/user/signController";
import { NODE_ENV } from "../../utils/envVariables";

export const sign = express();

//NODE_ENV === "production" && sign.use(signLimiter);

// sign-up route
sign.post('/sign-up', signZod(signUpSchema), signUpController);


sign.post('/sign-in', signZod(signInSchema), signInController);

// logout route - no auth middleware needed (anyone can logout, even with invalid token)
sign.post('/sign-out', signOutController);

