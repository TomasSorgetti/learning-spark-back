import { Response } from "express";
import {
  NotFoundError,
  GoneError,
  UnauthorizedError,
  APIError,
  UnavailableError,
} from "../../../shared/utils/app-errors";
import { IAuthProvider } from "../../types/IAuthProvider";
import { UserService } from "../../services/UserService";
import { SecurityService } from "../../../infrastructure/services/SecurityService";
import { TokenService } from "../../../infrastructure/services/TokenService";
import { SessionService } from "../../services/SessionService";
import { CookieService } from "../../../infrastructure/services/CookieService";
import mongoose from "mongoose";
import { serverConfig } from "../../../infrastructure/config";
import { RoleService } from "../../services/RoleService";

type IAuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};

export class GoogleAuthUseCase {
  constructor(
    private googleAuthService: IAuthProvider,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly securityService: SecurityService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private readonly cookieService: CookieService
  ) {}

  public async execute(
    res: Response,
    authenticatedUser: any,
    userAgent: string
  ): Promise<any> {
    const existingUser = await this.userService.getUserByEmail(
      authenticatedUser.email
    );

    if (existingUser && existingUser.deleted) {
      throw new GoneError("User deleted");
    }
    if (existingUser && !existingUser.emailVerified) {
      throw new UnauthorizedError("User not verified");
    }
    if (existingUser && existingUser.provider !== "google") {
      throw new UnauthorizedError("User logged with another provider");
    }
    if (
      existingUser &&
      existingUser.lockUntil &&
      existingUser.lockUntil > new Date()
    ) {
      throw new UnauthorizedError("User is locked");
    }
    if (existingUser && existingUser.loginAttempts >= 8) {
      await this.userService.updateLockUntil(
        existingUser._id,
        new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      );
      await this.userService.updateLoginAttempts(existingUser._id, 0);
      throw new UnauthorizedError(
        "User blocked. Too many login attempts, try again later."
      );
    }
    let newUser = null;

    if (!existingUser) {
      const roleId = await this.assignDefaultRole(authenticatedUser.email);
      const userDataWithRole = { ...authenticatedUser, roles: [roleId] };

      newUser = await this.userService.createUser({
        name: userDataWithRole.name,
        email: userDataWithRole.email,
        password: null,
        roles: userDataWithRole.roles,
        emailVerified: true,
        provider: "google",
      });
      if (!newUser) {
        throw new UnavailableError("Error creating user");
      }
    }

    const finalUser = newUser || existingUser;

    await this.userService.updateLoginAttempts(finalUser._id, 0);
    await this.userService.updateLockUntil(finalUser._id, null);

    // create access & refresh token
    const accessToken = this.tokenService.generateAccessToken(
      {
        sub: finalUser._id,
        email: finalUser.email,
        roles: finalUser.roles,
      },
      true
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      {
        sub: finalUser._id,
        email: finalUser.email,
        roles: finalUser.roles,
      },
      true
    );
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
      userId: finalUser._id,
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
      name: finalUser.name,
      email: finalUser.email,
      roles: finalUser.roles,
    };
  }

  private async assignDefaultRole(
    email: string
  ): Promise<mongoose.Types.ObjectId> {
    const roleName = email === serverConfig.OWNER_EMAIL ? "admin" : "user";
    const role = await this.roleService.getRoleByName(roleName);

    if (!role) {
      throw new APIError(`Role "${roleName}" not found`);
    }

    if (!mongoose.Types.ObjectId.isValid(role._id)) {
      throw new APIError(`Invalid ObjectId for role "${roleName}"`);
    }

    return role._id;
  }
}
