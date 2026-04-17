
import { z } from 'zod';



export const signInSchema = z.object({
    email: z.email().min(4).max(200),
    password: z.string().
        min(4, { message: "Please increase password length" }).
        max(200, { message: "Please decrease password length" }).
        regex(/[a-z]/, { message: "Please include alteast one lowercase character in password" }).
        regex(/[A-Z]/, { message: "Please include alteast one uppercase character in password" }).
        regex(/[0-9]/, { message: "Please include alteast one number as character in password" }).
        regex(/[&%$#@!]/, { message: "Password must contain at least one- &, %, $, #, @, !" }),
});


export const signUpSchema = signInSchema.extend({
    username: z.string().min(3).max(100)
});


export const updatePassswordSchema = signInSchema.extend({
    newPassword: z.string().min(4).max(200)
        .regex(/[A-Z]/, { message: "Please include alteast one uppercase character in the new password" })
        .regex(/[a-z]/, { message: "Please include alteast one lowercase character in the new password" })
        .regex(/[0-9]/, { message: "Please include alteast one number as character in the new password" })
        .regex(/[&%$#@!]/, { message: "The new password must contain at least one- &, %, $, #, @, !" })
})


export type SignInTypes = z.infer<typeof signInSchema>;
export type SignUpTypes = z.infer<typeof signUpSchema>;
export type UpdatePasswordTypes = z.infer<typeof updatePassswordSchema>;