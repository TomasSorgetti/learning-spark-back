import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  email: z.string().email("Invalid email format."),
  password: z.string().min(5, "Password must be at least 5 characters long."),
});

export const validateUserData = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  userSchema.parse(data);
};
