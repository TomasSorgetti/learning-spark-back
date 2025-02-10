import { z } from "zod";

export const UpdatePasswordDTO = z.object({
  password: z.string().trim(),
  newPassword: z
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters long"),
});
