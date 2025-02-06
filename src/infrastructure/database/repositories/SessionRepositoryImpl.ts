import mongoose from "mongoose";
import { ISession, SessionModel } from "../models/SessionSchema";
import { ISessionRepository } from "../../../domain/repositories/ISesisonRepository";

export class SessionRepositoryImpl implements ISessionRepository {
  async create(data: Partial<ISession>): Promise<ISession> {
    const newSession = new SessionModel(data);
    return await newSession.save();
  }
  async delete(sessionId: string): Promise<any> {
    return await SessionModel.deleteOne({ _id: sessionId });
  }
}
