import dotenv from "dotenv";

dotenv.config();

export const tokenConfig = {
  ACCESS_SECRET: process.env.ACCESS_SECRET || "access_secret",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "refresh_secret",
};
