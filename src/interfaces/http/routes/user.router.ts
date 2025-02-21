import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import isAdminGuard from "../../../infrastructure/middlewares/isAdminGuard";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import { UpdatePasswordDTO } from "../../../application/dtos/UpdatePasswordDTO";
import { changePasswordLimiter } from "../../../infrastructure/middlewares/rateLimiter";
import { container } from "../../../infrastructure/di/container";

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController(container.changePasswordUseCase, container.getAllUsersUseCase);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/",
      authenticateToken,
      isAdminGuard,
      (req: Request, res: Response, next: NextFunction) => {
        this.userController.getAllUsers(req, res, next);
      }
    );

    this.router.patch(
      "/change-password",
      changePasswordLimiter,
      authenticateToken,
      validateDTO(UpdatePasswordDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.userController.changePassword(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
