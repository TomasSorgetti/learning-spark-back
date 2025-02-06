import { Router } from "express";
import { UserRouter } from "./user.router";
import { AuthRouter } from "./auth.router";
import { ProductRouter } from "./product.router";
import { PostRouter } from "./post.router";
import { SubjectRouter } from "./subject.router";
import { RoleRouter } from "./role.router";

export class MainRouter {
  public router: Router;
  private userRouter: UserRouter;
  private authRouter: AuthRouter;
  private productRouter: ProductRouter;
  private postRouter: PostRouter;
  private subjectRouter: SubjectRouter;
  private roleRouter: RoleRouter;

  constructor() {
    this.router = Router();
    this.userRouter = new UserRouter();
    this.authRouter = new AuthRouter();
    this.productRouter = new ProductRouter();
    this.postRouter = new PostRouter();
    this.subjectRouter = new SubjectRouter();
    this.roleRouter = new RoleRouter();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use("/users", this.userRouter.getRouter());
    this.router.use("/auth", this.authRouter.getRouter());
    this.router.use("/role", this.roleRouter.getRouter());

    this.router.use("/product", this.productRouter.getRouter());
    // this.router.use("/category", categoryRouter.getRouter());

    this.router.use("/blog", this.postRouter.getRouter());
    this.router.use("/subject", this.subjectRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
