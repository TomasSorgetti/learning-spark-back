// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/AuthController";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import authenticateRefreshToken from "../../../infrastructure/middlewares/authenticateRefresh";

export class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/signin",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.login(req, res, next);
      }
    );

    this.router.post(
      "/signup",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.register(req, res, next);
      }
    );

    this.router.patch(
      "/verify",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.verify(req, res, next);
      }
    );

    this.router.get(
      "/me",
      authenticateToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.profile(req, res, next);
      }
    );

    this.router.post(
      "/logout",
      authenticateToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.logout(req, res, next);
      }
    );

    this.router.get(
      "/refresh",
      authenticateRefreshToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.refresh(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
