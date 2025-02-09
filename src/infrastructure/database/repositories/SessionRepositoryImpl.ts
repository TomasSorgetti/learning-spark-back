import mongoose, { Types } from "mongoose";
import { ISession, SessionModel } from "../models/SessionSchema";
import { ISessionRepository } from "../../../domain/repositories/ISesisonRepository";

export class SessionRepositoryImpl implements ISessionRepository {
  async getAll(userId: string, sessionId: string): Promise<ISession[] | []> {
    const sessionObjectId = new Types.ObjectId(sessionId);
    return await SessionModel.find({
      userId,
      _id: { $ne: sessionObjectId },
    }).select("-refreshToken");
  }

  async getOne(sessionId: string): Promise<ISession | null> {
    return await SessionModel.findOne({ _id: sessionId }).select(
      "-refreshToken"
    );
  }
  async getById(sessionId: string): Promise<ISession | null> {
    return await SessionModel.findOne({ _id: sessionId });
  }
  async create(data: Partial<ISession>): Promise<ISession> {
    const newSession = new SessionModel(data);
    return await newSession.save();
  }
  async delete(sessionId: string): Promise<any> {
    return await SessionModel.deleteOne({ _id: sessionId });
  }
}
