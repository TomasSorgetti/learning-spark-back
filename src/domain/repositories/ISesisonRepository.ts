import { ISession } from "../../infrastructure/database/models/SessionSchema";

export interface ISessionRepository {
  getById(sessionId: string): Promise<ISession | null>;
  create(code: Partial<ISession>): Promise<ISession>;
  delete(userId: string): Promise<any>;
}
