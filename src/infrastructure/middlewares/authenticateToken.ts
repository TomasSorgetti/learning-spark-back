import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../shared/utils/app-errors";
import { TokenService } from "../services/TokenService";
import { SessionService } from "../../application/services/SessionService";
import { container } from "../di/container";
import { CustomRequest } from "./types/request";

const authenticateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      throw new UnauthorizedError("Session not found");
    }
    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const session = await container.sessionService.getSession(sessionId);

    if (!session) {
      throw new UnauthorizedError("Session not found");
    }
    if (session && session.deleted) {
      throw new UnauthorizedError("Session deleted");
    }

    const decoded = container.tokenService.verifyAccessToken(token) as {
      sub: string;
    };

    if (!decoded || !decoded.sub) {
      throw new UnauthorizedError("Invalid token");
    }

    req.userId = decoded.sub;
    req.sessionId = session._id;

    next();
  } catch (error: any) {
    next(error);
  }
};

export default authenticateToken;
