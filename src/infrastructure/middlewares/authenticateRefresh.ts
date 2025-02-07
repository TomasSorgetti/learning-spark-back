import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../shared/utils/app-errors";
import { TokenService } from "../services/TokenService";

interface CustomRequest extends Request {
  userId?: string;
}

const tokenService = new TokenService();

const authenticateRefreshToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new UnauthorizedError("No refresh token provided");
    }

    const decoded = tokenService.verifyRefreshToken(token) as { sub: string };

    if (!decoded || !decoded.sub) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    req.userId = decoded.sub;

    next();
  } catch (error: any) {
    next(error);
  }
};

export default authenticateRefreshToken;
