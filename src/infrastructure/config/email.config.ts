import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
