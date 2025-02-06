// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/AuthController";

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
        console.log("Login Route");

        this.authController.login(req, res, next);
      }
    );

    this.router.post(
      "/signup",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.register(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
