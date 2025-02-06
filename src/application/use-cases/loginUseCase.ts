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

export class LoginUseCase {
  private userService: UserService;
  private securityService: SecurityService;
  private tokenService: TokenService;
  private sessionService: SessionService;
  private cookieService: CookieService;

  constructor() {
    this.userService = new UserService();
    this.securityService = new SecurityService();
    this.tokenService = new TokenService();
    this.sessionService = new SessionService();
    this.cookieService = new CookieService();
  }

  public async execute(res: Response, userData: ILoginUser): Promise<any> {
    const existingUser = await this.userService.getUserByEmail(userData.email);

    if (!existingUser) {
      throw new NotFoundError("Email not found");
    }
    if (existingUser && existingUser.deleted) {
      throw new GoneError("User deleted");
    }

    const isPasswordValid = await this.securityService.comparePasswords(
      userData.password,
      existingUser.getPassword()
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Incorrect password");
    }

    // create session
    const session = await this.sessionService.createSession({
      userId: existingUser._id,
    });
    if (!session) {
      throw new UnauthorizedError("Error creating session");
    }

    // create access & refresh token
    const accessToken = this.tokenService.generateAccessToken(
      {
        // sub: existingUser.getId(),
        // email: existingUser.getEmail(),
        // roles: existingUser.getRoles(),
      },
      userData.rememberme
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      {
        // sub: existingUser.getId(),
        // email: existingUser.getEmail(),
        // roles: existingUser.getRoles(),
      },
      userData.rememberme
    );
    //! Cookies need to expire longer than jwt
    this.cookieService.createCookie(res, "accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Strict",
      path: "/",
    });
    this.cookieService.createCookie(res, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Strict",
      path: "/",
    });

    const user = existingUser.toPrimitives();
    console.log(user);

    return user;
  }
}
