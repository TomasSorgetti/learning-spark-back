// src/interfaces/http/routes/UserRoutes.ts
import { NextFunction, Request, Response, Router } from "express";
import { RoleController } from "../controllers/RoleController";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import { CreateorUpdateRoleDTO } from "../../../application/dtos/CreateorUpdateRoleDTO";
import { container } from "../../../infrastructure/di/container";

export class RoleRouter {
  public router: Router;
  private roleController: RoleController;

  constructor() {
    this.router = Router();
    this.roleController = new RoleController(container.roleService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateRoleDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.roleController.createRole(req, res, next);
      }
    );
    this.router.patch(
      "/:_id",
      authenticateToken,
      isAdminGuard,
      validateDTO(CreateorUpdateRoleDTO),
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
