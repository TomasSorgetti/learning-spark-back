import { Response } from "express";
import { CookieService } from "../../infrastructure/services/CookieService";
import { TokenService } from "../../infrastructure/services/TokenService";
import { BadRequestError } from "../../shared/utils/app-errors";
import { UserService } from "../services/UserService";

export class RefreshUseCase {
  private userService: UserService;
  private cookieService: CookieService;
  private tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.cookieService = new CookieService();
    this.tokenService = new TokenService();
  }

  public async execute(userId: string, res: Response): Promise<any> {
    if (!userId) {
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

    // create access & refresh token
    const accessToken = this.tokenService.generateAccessToken(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
      false
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
      false
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

    return {
      message: "Tokens refreshed successfully",
    };
  }
}
