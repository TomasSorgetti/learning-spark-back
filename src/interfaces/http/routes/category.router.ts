// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import { CategoryController } from "../controllers/CategoryController";
import { CreateorUpdateCategoryDTO } from "../../../application/dtos/CreateorUpdateCategoryDTO";
import { container } from "../../../infrastructure/di/container";

export class CategoryRouter {
  public router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoryController(container.categoryService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.categoryController.getAllCategories(req, res, next);
    });

    this.router.get(
      "/:categoryId",
      (req: Request, res: Response, next: NextFunction) => {
        this.categoryController.getOneCategory(req, res, next);
      }
    );

    this.router.post(
      "/",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateCategoryDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.categoryController.createCategory(req, res, next);
      }
    );

    this.router.patch(
      "/:categoryId",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateCategoryDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.categoryController.updateCategory(req, res, next);
      }
    );

    this.router.delete(
      "/:categoryId",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.categoryController.deleteCategory(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
