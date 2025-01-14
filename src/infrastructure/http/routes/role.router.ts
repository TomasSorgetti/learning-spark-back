// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { RoleController } from "../controllers/RoleController";

export class RoleRouter {
  public router: Router;
  private roleController: RoleController;

  constructor() {
    this.router = Router();
    this.roleController = new RoleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      this.roleController.createRole(req, res, next);
    });
    this.router.patch(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.roleController.updateRole(req, res, next);
      }
    );
    this.router.delete(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.roleController.deleteRole(req, res, next);
      }
    );
    this.router.get(
      "/:_id",
      (req: Request, res: Response, next: NextFunction) => {
        this.roleController.getRole(req, res, next);
      }
    );
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.roleController.getAllRoles(req, res, next);
    });
  }

  public getRouter() {
    return this.router;
  }
}
