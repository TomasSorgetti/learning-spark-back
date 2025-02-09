// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { RoleController } from "../controllers/RoleController";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";

export class RoleRouter {
  public router: Router;
  private roleController: RoleController;

  constructor() {
    this.router = Router();
    this.roleController = new RoleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.roleController.createRole(req, res, next);
      }
    );
    this.router.patch(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.roleController.updateRole(req, res, next);
      }
    );
    this.router.delete(
      "/:_id",
      authenticateToken,
      isAdminGuard,
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
