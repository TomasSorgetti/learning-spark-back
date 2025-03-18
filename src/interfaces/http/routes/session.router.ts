import { NextFunction, Request, Response, Router } from "express";
import { SessionController } from "../controllers/SessionController";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import { container } from "../../../infrastructure/di/container";

export class SessionRouter {
  public router: Router;
  public sessionController: SessionController;

  constructor() {
    this.router = Router();
    this.sessionController = new SessionController(container.sessionService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/",
      authenticateToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.sessionController.getAllSessions(req, res, next);
      }
    );
    this.router.delete(
      "/",
      authenticateToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.sessionController.deleteSession(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
