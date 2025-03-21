import { NextFunction, Request, Response } from "express";
import { SessionService } from "../../../application/services/SessionService";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export class SessionController {
  constructor(
    private readonly sessionService: SessionService) {
  }

  public async getAllSessions(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId || "";
      const sessionId = req.sessionId || "";

      const response = await this.sessionService.getAllSession(
        userId,
        sessionId
      );
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteSession(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const sessionId = req.query.sessionId as string;

      const response = await this.sessionService.deleteSession(sessionId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
