import z from "zod";



export const chatQuerySchema = z.object({
    query: z.string()
        .min(2, { message: "Please increase query length at least 2" })
        .max(1000, { message: "Please decrease query length at most 1000" })
});

export const chatQueryValidator = (query: string) => {
    return chatQuerySchema.safeParse({ query });
}