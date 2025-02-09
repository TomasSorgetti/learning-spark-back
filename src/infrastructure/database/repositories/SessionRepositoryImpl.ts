import mongoose from "mongoose";
import { ISession, SessionModel } from "../models/SessionSchema";
import { ISessionRepository } from "../../../domain/repositories/ISesisonRepository";

export class SessionRepositoryImpl implements ISessionRepository {
  async getAll(userId: string): Promise<ISession[] | []> {
    return await SessionModel.find({ userId });
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
