import { ISession } from "../../infrastructure/database/models/SessionSchema";

export interface ISessionRepository {
  getAll(userId: string): Promise<ISession[] | []>;
  getById(sessionId: string): Promise<ISession | null>;
  create(code: Partial<ISession>): Promise<ISession>;
  delete(userId: string): Promise<any>;
}
