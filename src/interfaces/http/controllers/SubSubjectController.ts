import { NextFunction, Request, Response } from "express";
import { SubSubjectService } from "../../../application/services/SubSubjectService";

export class SubSubjectController {
  private subSubjectService: SubSubjectService;

  constructor() {
    this.subSubjectService = new SubSubjectService();
  }

  public async createSubSubject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, description, subjectId } = req.body;

      const response = await this.subSubjectService.createSubSubject(
        name,
        description,
        subjectId
      );
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updateSubSubject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.body;
      const { _id } = req.params;

      const response = await this.subSubjectService.updateSubSubject({
        name,
        _id,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteSubSubject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _id } = req.params;

      const response = await this.subSubjectService.updateSubSubject(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getSubSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;

      const response = await this.subSubjectService.getSubSubject(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getAllSubSubjects(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.subSubjectService.getAllSubSubjects();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
