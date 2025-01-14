// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { SubjectController } from "../controllers/SubjectController";

export class SubjectRouter {
  public router: Router;
  private subjectController: SubjectController;

  constructor() {
    this.router = Router();
    this.subjectController = new SubjectController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      this.subjectController.createSubject(req, res, next);
    });

    this.router.patch(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.subjectController.updateSubject(req, res, next);
      }
    );

    this.router.delete(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.subjectController.deleteSubject(req, res, next);
      }
    );

    this.router.get(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.subjectController.getSubject(req, res, next);
      }
    );

    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.subjectController.getAllSubjects(req, res, next);
    });
  }

  public getRouter() {
    return this.router;
  }
}
