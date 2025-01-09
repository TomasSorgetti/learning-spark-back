// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { ProductController } from "../controllers/ProductController";

export class ProductRouter {
  public router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      this.productController.createProduct(req, res, next);
    });

    this.router.get(
      "/:productId",
      (req: Request, res: Response, next: NextFunction) => {
        this.productController.getProductById(req, res, next);
      }
    );

    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.productController.getAllProducts(req, res, next);
    });

    this.router.put(
      "/:productId",
      (req: Request, res: Response, next: NextFunction) => {
        this.productController.updateProduct(req, res, next);
      }
    );

    this.router.delete(
      "/:productId",
      (req: Request, res: Response, next: NextFunction) => {
        this.productController.deleteProduct(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
