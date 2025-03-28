// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { PostController } from "../controllers/PostController";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import { CreateorUpdatePostDTO } from "../../../application/dtos/CreateorUpdatePostDTO";
import { container } from "../../../infrastructure/di/container";
import { cloudinaryUpload } from "../../../infrastructure/middlewares/cloudinaryUpload";

export class PostRouter {
  public router: Router;
  private postController: PostController;

  constructor() {
    this.router = Router();
    this.postController = new PostController(container.postService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticateToken,
      isAdminGuard,
      cloudinaryUpload("image"),
      // validateDTO(CreateorUpdatePostDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.createPost(req, res, next);
      }
    );

    this.router.patch(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      cloudinaryUpload("image"),
      // validateDTO(CreateorUpdatePostDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.updatePost(req, res, next);
      }
    );

    this.router.delete(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.deletePost(req, res, next);
      }
    );

    this.router.get(
      "/post/:url",
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.getPost(req, res, next);
      }
    );

    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.postController.getAllPosts(req, res, next);
    });

    this.router.get(
      "/top-viewed",
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.getTopViewedPosts(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
