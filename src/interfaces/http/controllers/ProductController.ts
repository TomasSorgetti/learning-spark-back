import { NextFunction, Request, Response } from "express";
import { ProductService } from "../../../application/services/ProductService";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price } = req.body;

      const response = await this.productService.create({
        name,
        description,
        price,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const response = await this.productService.getOne(productId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.productService.getAll();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updateProduct(req: Request, res: Response, next: NextFunction) {}

  public async deleteProduct(req: Request, res: Response, next: NextFunction) {}
}
