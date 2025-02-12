import { z } from "zod";

export const CreateorUpdateSubSubjectDTO = z.object({
  name: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
});
