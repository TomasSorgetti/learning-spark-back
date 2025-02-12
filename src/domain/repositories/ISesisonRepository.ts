import { ISession } from "../../infrastructure/database/models/users/SessionSchema";

export interface ISessionRepository {
  getAll(userId: string, sessionId: string): Promise<ISession[] | []>;
  getOne(sessionId: string): Promise<ISession | null>;
  getById(sessionId: string): Promise<ISession | null>;
  create(code: Partial<ISession>): Promise<ISession>;
  delete(userId: string): Promise<any>;
}
