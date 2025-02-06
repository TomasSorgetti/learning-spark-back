import jwt from "jsonwebtoken";
import { tokenConfig } from "../config";

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
}
