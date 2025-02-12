// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import { CreateorUpdateSubSubjectDTO } from "../../../application/dtos/CreateorUpdateSubSubjectDTO";
import { SubSubjectController } from "../controllers/SubSubjectController";

export class TopicRouter {
  public router: Router;
  private subSubjectController: SubSubjectController;

  constructor() {
    this.router = Router();
    this.subSubjectController = new SubSubjectController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateSubSubjectDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.subSubjectController.createSubSubject(req, res, next);
      }
    );

    this.router.patch(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateSubSubjectDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.subSubjectController.updateSubSubject(req, res, next);
      }
    );

    this.router.delete(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.subSubjectController.deleteSubSubject(req, res, next);
      }
    );

    this.router.get(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.subSubjectController.getSubSubject(req, res, next);
      }
    );

    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.subSubjectController.getAllSubSubjects(req, res, next);
    });
  }

  public getRouter() {
    return this.router;
  }
}
