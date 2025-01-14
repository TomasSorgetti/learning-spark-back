import dotenv from "dotenv";

dotenv.config();

export const redisConfig = {
  REDIS_HOST: process.env.REDIS_HOST || "redis",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
