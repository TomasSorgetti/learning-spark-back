import { Router } from "express";
import { UserRouter } from "./user.router";
import { AuthRouter } from "./auth.router";
import { ProductRouter } from "./product.router";
import { PostRouter } from "./post.router";
import { SubjectRouter } from "./subject.router";
import { RoleRouter } from "./role.router";

export class MainRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();
    const productRouter = new ProductRouter();
    const postRouter = new PostRouter();
    const subjectRouter = new SubjectRouter();
    const roleRouter = new RoleRouter();

    this.router.use("/users", userRouter.getRouter());
    this.router.use("/auth", authRouter.getRouter());
    this.router.use("/role", roleRouter.getRouter());

    this.router.use("/product", productRouter.getRouter());
    // this.router.use("/category", categoryRouter.getRouter());

    this.router.use("/blog", postRouter.getRouter());
    this.router.use("/subject", subjectRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
