import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../application/services/AuthService";
import { validateUserData } from "../../../shared/validators/userValidator";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, rememberme } = req.body;

      const { user, accessToken, refreshToken } = await this.authService.login({
        email,
        password,
        rememberme,
      });
      // create httpOnly cookies for access token & refresh token
      return res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      validateUserData({ name, email, password });

      const response = await this.authService.register({
        name,
        email,
        password,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.authService.verify();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.authService.profile();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.authService.logout();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
