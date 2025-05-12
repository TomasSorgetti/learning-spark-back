import dotenv from "dotenv";

dotenv.config();

export const googleAuthConfig = {
  SESSION_SECRET: process.env.SESSION_SECRET || "session_secret",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "TU_GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || "TU_GOOGLE_CLIENT_SECRET",
  CALLBACK_URL:
    process.env.CALLBACK_URL || "http://localhost:8080/v1/auth/google/callback",
};
