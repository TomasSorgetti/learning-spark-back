import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../shared/utils/app-errors";
import { TokenService } from "../services/TokenService";

interface CustomRequest extends Request {
  userId?: string;
}

const tokenService = new TokenService();

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const decoded = tokenService.verifyAccessToken(token) as { sub: string };

    if (!decoded || !decoded.sub) {
      throw new UnauthorizedError("Invalid token");
    }

    req.userId = decoded.sub;

    next();
  } catch (error: any) {
    next(error);
  }
};

export default authenticateToken;
