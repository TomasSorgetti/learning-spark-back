import Redis from "ioredis";

class RedisClient {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || "",
      db: 0,
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await this.client.get(key);
    return result ? JSON.parse(result) : null;
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    await this.client.set(key, JSON.stringify(value), "EX", ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }
}

export const redisClient = new RedisClient();
