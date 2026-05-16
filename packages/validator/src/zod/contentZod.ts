import { z } from 'zod';

const contentCategoryZod = z.enum(
  ['Development', 'Finance', 'Study', 'Social', 'GitHub', 'Exams', 'AI', 'Research', 'Design', 'Others'],
  { message: 'Invalid categroy' },
);

export const contentZodSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'Please increase title length to atleast 4 letters' })
    .max(1000, { message: 'Please decrease title length to atmax 1000 letters' }),
  link: z
    .string()
    .min(4, { message: 'Please increase link length to atleast 4 letters' })
    .max(1000, { message: 'Please decrease link length to atmax 1000 letters' }),
  category: contentCategoryZod,
  description: z
    .string()
    .min(4, { message: 'Please increase description length to atleast 4 letters' })
    .max(3000, { message: 'Please decrease description length to atmax 3000 letters' })
    .or(z.literal(''))
    .optional(),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Please increase Tags length to atleast 1 letters' })
        .max(50, { message: 'Please decrease Tags length to atmax 50 letters' }),
    )
    .optional(),
  share: z.boolean().optional(),
});

export const contentValidator = (data: z.infer<typeof contentZodSchema>) => {
  return contentZodSchema.safeParse(data);
};

export function validateDescriptionInput(input: string) {
  return contentZodSchema.shape.description.safeParse(input);
}
export function validateTitleInput(input: string) {
  return contentZodSchema.shape.title.safeParse(input);
}
export function validateLinkInput(input: string) {
  return contentZodSchema.shape.link.safeParse(input);
}
