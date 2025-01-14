import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../../../application/services/CategoryService";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
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
}
