// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      this.userController.createUser(req, res, next);
    });
  }

  public getRouter() {
    return this.router;
  }
}
