// src/infrastructure/redis/RedisCache.ts
import { redisClient } from "./RedisClient";

export class RedisCache {
  static async get<T>(key: string): Promise<T | null> {
    const result = await redisClient.get(key);
    if (result === null) {
      return null;
    }
    return JSON.parse(result) as T;
  }

  static async set<T>(
    key: string,
    value: T,
    ttl: number = 3600
  ): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), "EX", ttl);
  }

  static async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
