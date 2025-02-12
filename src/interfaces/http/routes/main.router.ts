import { Router } from "express";
import { UserRouter } from "./user.router";
import { AuthRouter } from "./auth.router";
import { PostRouter } from "./post.router";
import { SubjectRouter } from "./subject.router";
import { RoleRouter } from "./role.router";
import { SessionRouter } from "./session.router";
import { SubSubjectRouter } from "./subSubject.router";

export class MainRouter {
  public router: Router;
  private userRouter: UserRouter;
  private authRouter: AuthRouter;
  private postRouter: PostRouter;
  private subjectRouter: SubjectRouter;
  private roleRouter: RoleRouter;
  private sessionRouter: SessionRouter;
  private subSubjectRouter: SubSubjectRouter;

  constructor() {
    this.router = Router();
    this.userRouter = new UserRouter();
    this.authRouter = new AuthRouter();
    this.postRouter = new PostRouter();
    this.subjectRouter = new SubjectRouter();
    this.subSubjectRouter = new SubSubjectRouter();
    this.roleRouter = new RoleRouter();
    this.sessionRouter = new SessionRouter();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use("/users", this.userRouter.getRouter());
    this.router.use("/auth", this.authRouter.getRouter());
    this.router.use("/session", this.sessionRouter.getRouter());
    this.router.use("/role", this.roleRouter.getRouter());

    this.router.use("/blog", this.postRouter.getRouter());
    this.router.use("/subject", this.subjectRouter.getRouter());
    this.router.use("/sub-subject", this.subSubjectRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
