import dotenv from "dotenv";

dotenv.config();

export const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 8080,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};
