
import { z } from 'zod';

const contentCategoryZod = z.enum(["Development", "Finance", "Study", "Social", "GitHub", "Exams", "AI", "Research", "Design", "Others"], { message: "Invalid categroy" })

export const contentZodSchema = z.object({
    title: z.string().min(4).max(100),
    link: z.url().min(3).max(1000),
    category: contentCategoryZod,
    description: z.string().min(3).max(1000).optional(),
    tags: z.array(z.string().max(50)).optional(),
    share: z.boolean().optional()
});

export const contentValidator = (data: z.infer<typeof contentZodSchema>) => {
    return contentZodSchema.safeParse(data);
}