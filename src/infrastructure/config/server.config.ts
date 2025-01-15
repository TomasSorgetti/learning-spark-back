import dotenv from "dotenv";

dotenv.config();

export const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 8080,
  OWNER_EMAIL: process.env.OWNER_EMAIL,
};
