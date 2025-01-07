import { createClient, RedisClientType } from "redis";
import { redisConfig } from "../../infrastructure/config/redis.config";

let redisClient: RedisClientType | null = null;

export const connectRedis = (): RedisClientType => {
  if (redisClient) return redisClient;

  redisClient = createClient({
    url: `redis://${redisConfig.REDIS_HOST}:${redisConfig.REDIS_PORT}`,
  });

  redisClient.on("connect", () => {
    console.log("Conected to Redis");
  });

  redisClient.on("error", (err) => {
    console.error("Error connecting to Redis:", err);
  });

  redisClient.connect();

  return redisClient;
};

export const initRedis = connectRedis;
