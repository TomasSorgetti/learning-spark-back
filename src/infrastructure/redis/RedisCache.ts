import { redisClient } from "./RedisClient";

export class RedisCache {
  static async get<T>(key: string, parse: boolean = true): Promise<T | null> {
    try {
      const result = await redisClient.get(key);
      if (result === null) return null;
      return parse ? (JSON.parse(result) as T) : (result as T);
    } catch (error) {
      console.error(`Redis get error for key ${key}:`, error);
      return null;
    }
  }

  static async set<T>(
    key: string,
    value: T,
    ttl: number = 3600,
    stringify: boolean = true
  ): Promise<void> {
    try {
      const data = stringify ? JSON.stringify(value) : (value as string);
      await redisClient.set(key, data, "EX", ttl);
    } catch (error) {
      console.error(`Redis set error for key ${key}:`, error);
      throw error;
    }
  }

  static async delete(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error(`Redis delete error for key ${key}:`, error);
    }
  }

  static async deletePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.getKeysByPattern(pattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
    } catch (error) {
      console.error(`Redis deletePattern error for pattern ${pattern}:`, error);
    }
  }

  static async clearNamespace(namespace: string): Promise<void> {
    await this.deletePattern(`${namespace}:*`);
  }

  static async clearAll(): Promise<void> {
    try {
      await redisClient.flushall();
    } catch (error) {
      console.error("Redis clearAll error:", error);
    }
  }

  private static async getKeysByPattern(pattern: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor = "0";
    do {
      const [newCursor, foundKeys] = await redisClient.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        100
      );
      cursor = newCursor;
      keys.push(...foundKeys);
    } while (cursor !== "0");
    return keys;
  }
}
