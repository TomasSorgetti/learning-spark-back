import { Response } from "express";
import { CookieService } from "../../../infrastructure/services/CookieService";
import { TokenService } from "../../../infrastructure/services/TokenService";
import { BadRequestError } from "../../../shared/utils/app-errors";
import { UserService } from "../../services/UserService";

export class RefreshUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService
  ) {}

  public async execute(
    rememberme: boolean,
    userId: string,
    sessionId: string,
    res: Response
  ): Promise<any> {
    if (!userId || !sessionId) {
      throw new BadRequestError("Fields are required.");
    }
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new BadRequestError("User not found");
    }
    if (user && user.deleted) {
      throw new BadRequestError("User deleted");
    }
    if (user && !user.validated) {
      throw new BadRequestError("User not validated");
    }

    const accessToken = this.tokenService.generateAccessToken(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
      rememberme
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
      rememberme
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
    this.cookieService.createCookie(res, "sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      sameSite: "Lax", // Strict for https
      path: "/",
    });

    return {
      message: "Tokens refreshed successfully",
    };
  }
}
