import { SessionRepositoryImpl } from "../../infrastructure/database/repositories/SessionRepositoryImpl";

export class SessionService {
  private sessionRepository: SessionRepositoryImpl;
  constructor() {
    this.sessionRepository = new SessionRepositoryImpl();
  }

  public async createSession(sessionData: any): Promise<any> {
    return await this.sessionRepository.create(sessionData);
  }
  public async deleteSession(userId: string): Promise<any> {
    return await this.sessionRepository.delete(userId);
  }
}
