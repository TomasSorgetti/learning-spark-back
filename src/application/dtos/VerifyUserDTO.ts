import { z } from "zod";

export const VerifyUserDTO = z.object({
  userId: z.string().trim(),
  code: z.string().min(6, "Code must be 6 characters long").max(6),
});
