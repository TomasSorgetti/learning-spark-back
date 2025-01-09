import dotenv from "dotenv";

dotenv.config();

export const redisConfig = {
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 123456,
};
