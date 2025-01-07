import { RedisClientType } from "redis";
import { connectRedis } from "./redisClient";

class RedisRepository {
  private client: RedisClientType;

  constructor() {
    this.client = connectRedis();
  }

  async set(key: string, value: unknown): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error al guardar en Redis:", error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const result = await this.client.get(key);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.error("Error al obtener de Redis:", error);
      return null;
    }
  }

  close(): void {
    this.client.quit();
  }
}

export { RedisRepository };
