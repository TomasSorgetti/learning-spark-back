import { TopicRepositoryImpl } from "../../infrastructure/database/repositories/TopicRepositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";

export class TopicService {
  private topicRepository: TopicRepositoryImpl;
  constructor() {
    this.topicRepository = new TopicRepositoryImpl();
  }

  public async createTopic(
    name: string,
    subSubjectId: string,
    sectionType: string,
    purchaseRequired?: boolean
  ): Promise<any> {
    await RedisCache.delete("topics");
    return await this.topicRepository.create(
      name,
      subSubjectId,
      sectionType,
      purchaseRequired
    );
  }

  public async updateTopic(subSubjectData: any): Promise<any> {
    await RedisCache.delete("topics");
    await RedisCache.delete(`topic-${subSubjectData._id}`);
    return await this.topicRepository.update(subSubjectData);
  }

  public async deleteTopic(_id: string): Promise<any> {
    await RedisCache.delete("topics");
    await RedisCache.delete(`topic-${_id}`);
    return await this.topicRepository.delete(_id);
  }

  public async getTopic(_id: string): Promise<any> {
    const cacheKey = `topic-${_id}`;
    const cachedTopics = await RedisCache.get(cacheKey);

    if (cachedTopics && typeof cachedTopics === "string") {
      return JSON.parse(cachedTopics);
    }

    const topic = await this.topicRepository.getById(_id);

    await RedisCache.set(cacheKey, JSON.stringify(topic), 3600);

    return topic;
  }

  public async getAllTopics(): Promise<any> {
    const cacheKey = `topics`;
    const cachedTopics = await RedisCache.get(cacheKey);

    if (cachedTopics && typeof cachedTopics === "string") {
      return JSON.parse(cachedTopics);
    }

    const topics = await this.topicRepository.getAll();

    if (topics.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(topics), 3600);
    }

    return topics;
  }
}
