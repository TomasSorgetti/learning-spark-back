import { SessionRepositoryImpl } from "../../infrastructure/database/repositories/SessionRepositoryImpl";

export class SessionService {
  private sessionRepository: SessionRepositoryImpl;
  constructor() {
    this.sessionRepository = new SessionRepositoryImpl();
  }

  public async getAllSession(userId: string): Promise<any> {
    return await this.sessionRepository.getAll(userId);
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
