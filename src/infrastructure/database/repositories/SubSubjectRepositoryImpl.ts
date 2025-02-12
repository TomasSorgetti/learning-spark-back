import {
  ISubSubject,
  SubSubjectModel,
} from "../models/subjects/SubSubjectSchema";
import { ConflictError } from "../../../shared/utils/app-errors";
import { ISubSubjectRepository } from "../../../domain/repositories/ISubSubjectRepository";
import mongoose from "mongoose";

export class SubSubjectRepositoryImpl implements ISubSubjectRepository {
  async create(
    name: string,
    description: string,
    subjectId: string
  ): Promise<ISubSubject> {
    try {
      const subjectObjectId = new mongoose.Types.ObjectId(subjectId);

      const newSubSubject = new SubSubjectModel({
        name,
        description,
        subjectId: subjectObjectId,
      });

      return await newSubSubject.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError(
          `Sub-subject with the given identifier already exists: ${JSON.stringify(
            error.keyValue
          )}`
        );
      }
      throw new ConflictError(`Failed to create sub-subject: ${error.message}`);
    }
  }

  async update(subject: Partial<ISubSubject>): Promise<ISubSubject | null> {
    if (!subject._id) {
      throw new ConflictError("Sub-subject ID is required for update");
    }
    return SubSubjectModel.findByIdAndUpdate(subject._id, subject, {
      new: true,
    }).exec();
  }

  async delete(subjectId: string): Promise<ISubSubject | null> {
    return SubSubjectModel.findByIdAndDelete(subjectId).exec();
  }

  async getById(subjectId: string): Promise<ISubSubject | null> {
    const subject = await SubSubjectModel.findById(subjectId).exec();
    if (!subject) {
      throw new ConflictError(`Sub-subject with ID ${subjectId} not found`);
    }
    return subject;
  }

  async getAll(): Promise<ISubSubject[]> {
    return SubSubjectModel.find().exec();
  }
}
