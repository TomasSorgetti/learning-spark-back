// redisClient.ts
import Redis from "ioredis";
import { redisConfig } from "../config";

const redisClient = new Redis({
  host: redisConfig.REDIS_HOST,
  port: redisConfig.REDIS_PORT,
});

export { redisClient };
