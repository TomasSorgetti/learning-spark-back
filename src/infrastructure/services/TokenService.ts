import jwt from "jsonwebtoken";
import { tokenConfig } from "../config";
import { UnauthorizedError } from "../../shared/utils/app-errors";

export class TokenService {
  constructor() {}

  public generateAccessToken = (
    payload: object,
    rememberme: boolean
  ): string => {
    return jwt.sign(payload, tokenConfig.ACCESS_SECRET, {
      expiresIn: rememberme ? "60m" : "15m",
    });
  };

  public generateRefreshToken = (
    payload: object,
    rememberme: boolean
  ): string => {
    return jwt.sign(payload, tokenConfig.REFRESH_SECRET, {
      expiresIn: rememberme ? "60d" : "7d",
    });
  };

  public verifyAccessToken = (token: string): object | string => {
    try {
      return jwt.verify(token, tokenConfig.ACCESS_SECRET);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError("Token expired");
      }
      throw new UnauthorizedError("Invalid or malformed access token");
    }
  };

  public verifyRefreshToken = (token: string): object | string => {
    try {
      return jwt.verify(token, tokenConfig.REFRESH_SECRET);
    } catch (error: any) {
      console.log("Verify Refresh Token Service", error.name);
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError("Token expired");
      }

      throw new UnauthorizedError("Invalid or malformed refresh token");
    }
  };
}
