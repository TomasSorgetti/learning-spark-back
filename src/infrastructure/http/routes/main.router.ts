import { Router } from "express";
import { UserRouter } from "./user.router";
import { AuthRouter } from "./auth.router";

export class MainRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();

    this.router.use("/users", userRouter.getRouter());
    this.router.use("/auth", authRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
