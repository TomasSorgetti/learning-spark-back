// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { PostController } from "../controllers/PostController";

export class PostRouter {
  public router: Router;
  private postController: PostController;

  constructor() {
    this.router = Router();
    this.postController = new PostController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      this.postController.createPost(req, res, next);
    });

    this.router.patch(
      "/:postId",
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.updatePost(req, res, next);
      }
    );

    this.router.delete(
      "/:postId",
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.deletePost(req, res, next);
      }
    );

    this.router.get(
      "/:postId",
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.getPost(req, res, next);
      }
    );

    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.postController.getAllPosts(req, res, next);
    });
  }

  public getRouter() {
    return this.router;
  }
}
