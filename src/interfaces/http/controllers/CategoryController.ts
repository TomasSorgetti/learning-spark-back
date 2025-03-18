import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../../../application/services/CategoryService";

export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService) {
  }

  public async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = "";
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getOneCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;

      const response = "";
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const response = await this.categoryService.createCategory(name);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const response = "";
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;

      const response = "";
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
