import { z } from "zod";

export const CreateorUpdateSubjectDTO = z.object({
  name: z.string().min(3, "Title must be at least 3 characters long"),
});
