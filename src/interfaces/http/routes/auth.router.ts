import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/AuthController";
import authenticateToken from "../../../infrastructure/middlewares/authenticateToken";
import authenticateRefreshToken from "../../../infrastructure/middlewares/authenticateRefresh";
import { CreateUserDTO } from "../../../application/dtos/CreateUserDTO";
import { validateDTO } from "../../../infrastructure/middlewares/validateDTO";
import { VerifyUserDTO } from "../../../application/dtos/VerifyUserDTO";
import {
  loginLimiter,
  refreshTokenLimiter,
  registerLimiter,
  verifyCodeLimiter,
} from "../../../infrastructure/middlewares/rateLimiter";
import { container } from "../../../infrastructure/di/container";

export class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController(
      container.registerUserUseCase,
      container.loginUseCase,
      container.verifyUserUseCase,
      container.logoutUseCase,
      container.profileUseCase,
      container.refreshUseCase,
      container.resendCodeUseCase,
      container.googleAuthUseCase
    );
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/signin",
      loginLimiter,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.login(req, res, next);
      }
    );

    this.router.post(
      "/signup",
      registerLimiter,
      validateDTO(CreateUserDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.register(req, res, next);
      }
    );

    this.router.patch(
      "/resend-code",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.resendCode(req, res, next);
      }
    );

    this.router.patch(
      "/verify",
      verifyCodeLimiter,
      validateDTO(VerifyUserDTO),
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.verify(req, res, next);
      }
    );

    this.router.get(
      "/me",
      authenticateToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.profile(req, res, next);
      }
    );

    this.router.post(
      "/logout",
      authenticateToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.logout(req, res, next);
      }
    );

    this.router.get(
      "/refresh",
      refreshTokenLimiter,
      authenticateRefreshToken,
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.refresh(req, res, next);
      }
    );

    this.router.get(
      "/google",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.googleLogin(req, res, next);
      }
    );

    this.router.get(
      "/google/callback",
      (req: Request, res: Response, next: NextFunction) => {
        this.authController.googleCallback(req, res, next);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
