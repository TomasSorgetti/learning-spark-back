import { UserService } from "../services/UserService";
import { ILoginUser } from "../interfaces/IAuthService";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import {
  NotFoundError,
  GoneError,
  UnauthorizedError,
} from "../../shared/utils/app-errors";
import { TokenService } from "../../infrastructure/services/TokenService";
import { SessionService } from "../services/SessionService";
import { Response } from "express";
import { CookieService } from "../../infrastructure/services/CookieService";

export class LogoutUseCase {
  private sessionService: SessionService;
  private cookieService: CookieService;

  constructor() {
    this.sessionService = new SessionService();
    this.cookieService = new CookieService();
  }

  public async execute(res: Response, sessionId: string): Promise<any> {
    this.cookieService.removeCookie(res, "accessToken");
    this.cookieService.removeCookie(res, "refreshToken");

    await this.sessionService.deleteSession(sessionId);

    return { message: "Logged out successfully" };
  }
}
