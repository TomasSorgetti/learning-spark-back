// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.userController.getAllUsers(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
