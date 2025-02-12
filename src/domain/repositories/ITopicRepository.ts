import { ITopic } from "../../infrastructure/database/models/topics/TopicSchema";

export interface ITopicRepository {
  create(
    name: string,
    subsubjectId: string,
    sectionType: string,
    purchaseRequired?: boolean
  ): Promise<ITopic>;
  update(topic: Partial<ITopic>): Promise<ITopic | null>;
  delete(topicId: string): Promise<ITopic | null>;
  getById(topicId: string): Promise<ITopic | null>;
  getAll(): Promise<ITopic[]>;
}
