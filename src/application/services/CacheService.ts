import { RedisRepository } from "../../infrastructure/redis/redisRepository";

class CacheService {
  private redisRepository: RedisRepository;

  constructor() {
    this.redisRepository = new RedisRepository();
  }

  async setCache(key: string, value: unknown): Promise<void> {
    try {
      await this.redisRepository.set(key, value);
    } catch (error) {
      console.error("Error to set cache:", error);
    }
  }

  async getCache<T>(key: string): Promise<T | null> {
    try {
      return await this.redisRepository.get<T>(key);
    } catch (error) {
      console.error("Error to get cache:", error);
      return null;
    }
  }

  closeCache(): void {
    this.redisRepository.close();
  }
}

export { CacheService };
