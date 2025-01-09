import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../application/services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const response = await this.authService.login({ email, password });
      return res.status(201).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const response = await this.authService.register({
        name,
        email,
        password,
      });
      return res.status(201).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
