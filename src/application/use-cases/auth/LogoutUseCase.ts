import { Response } from "express";
import { NotFoundError, GoneError } from "../../../shared/utils/app-errors";
import { SessionService } from "../../services/SessionService";
import { CookieService } from "../../../infrastructure/services/CookieService";

export class LogoutUseCase {
  constructor(
    private readonly sessionService: SessionService,
    private readonly cookieService: CookieService
  ) {}

  public async execute(res: Response, sessionId: string): Promise<any> {
    if (!sessionId) {
      throw new NotFoundError("Fields are required.");
    }
    this.cookieService.removeCookie(res, "accessToken");
    this.cookieService.removeCookie(res, "refreshToken");

    const session = await this.sessionService.deleteSession(sessionId);

    if (!session) {
      throw new GoneError("Session not found");
    }
    return { message: "Logged out successfully" };
  }
}
