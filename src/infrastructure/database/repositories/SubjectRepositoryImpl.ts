import { ISubject, SubjectModel } from "../models/subjects/SubjectSchema";
import { ISubjectRepository } from "../../../domain/repositories/ISubjectRepository";
import { ConflictError } from "../../../shared/utils/app-errors";

export class SubjectRepositoryImpl implements ISubjectRepository {
  async create(subject: Partial<ISubject>): Promise<ISubject> {
    const newSubject = new SubjectModel(subject);
    try {
      return await newSubject.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError(
          `Subject with the given identifier already exists: ${JSON.stringify(
            error.keyValue
          )}`
        );
      }
      throw new ConflictError(`Failed to create subject: ${error.message}`);
    }
  }

  async update(subject: Partial<ISubject>): Promise<ISubject | null> {
    if (!subject._id) {
      throw new ConflictError("Subject ID is required for update");
    }
    return SubjectModel.findByIdAndUpdate(subject._id, subject, {
      new: true,
    }).exec();
  }

  async delete(subjectId: string): Promise<ISubject | null> {
    return SubjectModel.findByIdAndDelete(subjectId).exec();
  }

  async getById(subjectId: string): Promise<ISubject | null> {
    const subject = await SubjectModel.findById(subjectId).exec();
    if (!subject) {
      throw new ConflictError(`Subject with ID ${subjectId} not found`);
    }
    return subject;
  }

  async getAll(): Promise<ISubject[]> {
    return SubjectModel.find().exec();
  }
}
