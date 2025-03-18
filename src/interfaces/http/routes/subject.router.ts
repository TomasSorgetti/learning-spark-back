import { NextFunction, Request, Response, Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import { CreateorUpdateSubjectDTO } from "../../../application/dtos/CreateorUpdateSubjectDTO";
import { container } from "../../../infrastructure/di/container";

export class SubjectRouter {
  public router: Router;
  private subjectController: SubjectController;

  constructor() {
    this.router = Router();
    this.subjectController = new SubjectController(container.subjectService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateSubjectDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.subjectController.createSubject(req, res, next);
      }
    );

    this.router.patch(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateSubjectDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.subjectController.updateSubject(req, res, next);
      }
    );

    this.router.delete(
      "/:_id",
      authenticateToken,
      isAdminGuard,
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
