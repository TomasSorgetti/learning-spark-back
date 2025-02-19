import { Response } from "express";
import {
  NotFoundError,
  GoneError,
  UnauthorizedError,
} from "../../../shared/utils/app-errors";

import { UserService } from "../../services/UserService";
import { ILoginUser } from "../../interfaces/IAuthService";
import { SecurityService } from "../../../infrastructure/services/SecurityService";
import { TokenService } from "../../../infrastructure/services/TokenService";
import { SessionService } from "../../services/SessionService";
import { CookieService } from "../../../infrastructure/services/CookieService";

export class LoginUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private readonly cookieService: CookieService
  ) {}

  public async execute(
    res: Response,
    userData: ILoginUser,
    userAgent: string
  ): Promise<any> {
    const existingUser = await this.userService.getUserByEmail(userData.email);

    if (!existingUser) {
      throw new NotFoundError("Email not found");
    }
    if (existingUser && existingUser.deleted) {
      throw new GoneError("User deleted");
    }
    if (existingUser && !existingUser.emailVerified) {
      throw new UnauthorizedError("User not verified");
    }
    if (
      existingUser &&
      existingUser.lockUntil &&
      existingUser.lockUntil > new Date()
    ) {
      throw new UnauthorizedError("User is locked");
    }
    if (existingUser.loginAttempts >= 8) {
      await this.userService.updateLockUntil(
        existingUser._id,
        new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      );
      await this.userService.updateLoginAttempts(existingUser._id, 0);
      throw new UnauthorizedError(
        "User blocked. Too many login attempts, try again later."
      );
    }

    const isPasswordValid = await this.securityService.comparePasswords(
      userData.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      await this.userService.updateLoginAttempts(
        existingUser._id,
        existingUser.loginAttempts + 1 || 1
      );
      throw new UnauthorizedError("Incorrect password");
    }

    await this.userService.updateLoginAttempts(existingUser._id, 0);
    await this.userService.updateLockUntil(existingUser._id, null);

    // create access & refresh token
    const accessToken = this.tokenService.generateAccessToken(
      {
        sub: existingUser._id,
        email: existingUser.email,
        roles: existingUser.roles,
      },
      userData.rememberme
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      {
        sub: existingUser._id,
        email: existingUser.email,
        roles: existingUser.roles,
      },
      userData.rememberme
    );
    //! Cookies need to expire longer than jwt
    this.cookieService.createCookie(res, "accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Lax", // Strict for https
      path: "/",
    });
    this.cookieService.createCookie(res, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Lax", // Strict for https
      path: "/",
    });

    // create session
    const session = await this.sessionService.createSession({
      userId: existingUser._id,
      userAgent,
      refreshToken,
    });
    if (!session) {
      throw new UnauthorizedError("Error creating session");
    }

    this.cookieService.createCookie(res, "sessionId", session._id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Lax", // Strict for https
      path: "/",
    });

    return {
      name: existingUser.name,
      email: existingUser.email,
      roles: existingUser.roles,
    };
  }
}
