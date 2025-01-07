import { Router } from "express";
import { UserRouter } from "./user.router";

export class MainRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const userRouter = new UserRouter();

    this.router.use("/users", userRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
