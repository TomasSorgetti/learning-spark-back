import mongoose from "mongoose";
import { ConflictError } from "../../../shared/utils/app-errors";
import { ITopicRepository } from "../../../domain/repositories/ITopicRepository";
import { ITopic, TopicModel } from "../models/topics/TopicSchema";

export class TopicRepositoryImpl implements ITopicRepository {
  async create(
    name: string,
    subsubjectId: string,
    sectionType: string,
    purchaseRequired?: boolean
  ): Promise<ITopic> {
    try {
      const subSubjectObjectId = new mongoose.Types.ObjectId(subsubjectId);

      const newSubSubject = new TopicModel({
        name,
        sectionType,
        purchaseRequired,
        subsubjectId: subSubjectObjectId,
      });

      return await newSubSubject.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError(
          `Topic with the given identifier already exists: ${JSON.stringify(
            error.keyValue
          )}`
        );
      }
      throw new ConflictError(`Failed to create Topic: ${error.message}`);
    }
  }

  async update(topic: Partial<ITopic>): Promise<ITopic | null> {
    if (!topic._id) {
      throw new ConflictError("Topic ID is required for update");
    }
    return TopicModel.findByIdAndUpdate(topic._id, topic, {
      new: true,
    }).exec();
  }

  async delete(TopicId: string): Promise<ITopic | null> {
    return TopicModel.findByIdAndDelete(TopicId).exec();
  }

  async getById(topicId: string): Promise<ITopic | null> {
    const topic = await TopicModel.findById(topicId).exec();
    if (!topic) {
      throw new ConflictError(`Topic with ID ${topicId} not found`);
    }
    return topic;
  }

  async getAll(): Promise<ITopic[]> {
    return TopicModel.find().exec();
  }
}
