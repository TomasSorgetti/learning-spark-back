import { z } from "zod";

export const CreateorUpdatePostDTO = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .refine((content) => content.trim().length > 0, {
      message: "Content cannot be empty",
    })
    .refine((content) => /<[^>]+>/g.test(content), {
      message: "Content should contain valid HTML tags",
    }),
  author: z.string().min(3, "Author must be at least 3 characters long"),
  tags: z.string().min(3, "Tags must be at least 3 characters long"),
  url: z.string(),
  image: z.string().url("Invalid image url").optional(),
  subjectId: z.string().min(1, "Subject ID is required"),
});
