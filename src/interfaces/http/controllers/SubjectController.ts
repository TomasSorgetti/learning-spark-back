import { NextFunction, Request, Response } from "express";
import { SubjectService } from "../../../application/services/SubjectService";

export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  public async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const response = await this.subjectService.createSubject(name);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updateSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { _id } = req.params;

      const response = await this.subjectService.updateSubject({
        name,
        _id,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;

      const response = await this.subjectService.updateSubject(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;

      const response = await this.subjectService.getSubject(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
  public async getAllSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.subjectService.getAllSubjects();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
