import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .email()
    .min(4, { message: 'Please increase email length to atleast 4 letters' })
    .max(200, { message: 'Please decrease email length to atmax 200 letters' }),
  password: z
    .string()
    .min(6, { message: 'Please increase password length to atleast 6 letters' })
    .max(200, { message: 'Please decrease password length to atmax 200 letters' })
    .regex(/[a-z]/, { message: 'Please include alteast one lowercase letter in password' })
    .regex(/[A-Z]/, { message: 'Please include alteast one uppercase letter in password' })
    .regex(/[0-9]/, { message: 'Please include alteast one number as letter in password' })
    .regex(/[&%$#@!]/, { message: 'Password must contain at least one- &, %, $, #, @, !' }),
});

export const signUpSchema = signInSchema.extend({
  username: z
    .string()
    .min(4, { message: 'Please increase username length to atleast 4 letters' })
    .max(100, { message: 'Please decrease username length to atmax 100 letters' }),
});

export const updatePassswordSchema = signInSchema.extend({
  newPassword: z
    .string()
    .min(4, { message: 'Please increase username length to atleast 4 letters' })
    .max(100, { message: 'Please decrease username length to atmax 100 letters' })
    .regex(/[A-Z]/, { message: 'Please include alteast one uppercase letter in the new password' })
    .regex(/[a-z]/, { message: 'Please include alteast one lowercase letter in the new password' })
    .regex(/[0-9]/, { message: 'Please include alteast one number as letter in the new password' })
    .regex(/[&%$#@!]/, { message: 'The new password must contain at least one- &, %, $, #, @, !' }),
});

export function validatePasswordInput(input: string) {
  return signUpSchema.shape.password.safeParse(input);
}

export function validateUsernameInput(input: string) {
  return signUpSchema.shape.username.safeParse(input);
}

export type SignInTypes = z.infer<typeof signInSchema>;
export type SignUpTypes = z.infer<typeof signUpSchema>;
export type UpdatePasswordTypes = z.infer<typeof updatePassswordSchema>;
