import z from "zod";


export const otpZod = z.object({
    otp: z.string()
        .min(6, { message: "Size of OTP must be 6." })
        .max(6, { message: "Size of OTP must be 6." })
        .regex(/^[0-9]+$/, "Only numbers are allowed.")
})

