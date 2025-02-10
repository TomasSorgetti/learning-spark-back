import { z } from "zod";

export const CreateUserDTO = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(30, "Name must be at most 30 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});
