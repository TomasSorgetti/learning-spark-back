import { ISession } from "../../infrastructure/database/models/SessionSchema";

export interface ISessionRepository {
  create(code: Partial<ISession>): Promise<ISession>;
  delete(userId: string): Promise<any>;
}
