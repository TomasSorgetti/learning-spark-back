import { SessionRepositoryImpl } from "../../infrastructure/database/repositories/SessionRepositoryImpl";

export class SessionService {
  private sessionRepository: SessionRepositoryImpl;
  constructor() {
    this.sessionRepository = new SessionRepositoryImpl();
  }

  public async getAllSession(userId: string, sessionId: string): Promise<any> {
    const allSessions = await this.sessionRepository.getAll(userId, sessionId);

    const currentSession = await this.sessionRepository.getOne(sessionId);

    return {
      allSessions,
      currentSession,
    };
  }

  public async getSession(sessionId: string): Promise<any> {
    return await this.sessionRepository.getById(sessionId);
  }

  public async createSession(sessionData: any): Promise<any> {
    return await this.sessionRepository.create(sessionData);
  }

  public async deleteSession(sessionId: string): Promise<any> {
    return await this.sessionRepository.delete(sessionId);
  }
}
