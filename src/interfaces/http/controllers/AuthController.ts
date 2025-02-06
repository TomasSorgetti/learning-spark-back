import { NextFunction, Request, Response } from "express";
import { validateUserData } from "../../../shared/validators/userValidator";
import { LoginUseCase } from "../../../application/use-cases/loginUseCase";
import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUserUseCase";

export class AuthController {
  private loginUseCase: LoginUseCase;
  private registerUserUseCase: RegisterUserUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.registerUserUseCase = new RegisterUserUseCase();
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      validateUserData({ name, email, password });

      const response = await this.registerUserUseCase.execute({
        name,
        email,
        password,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, rememberme } = req.body;

      const user = await this.loginUseCase.execute(res, {
        email,
        password,
        rememberme,
      });
      return res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200);
    } catch (error: any) {
      next(error);
    }
  }

  public async profile(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200);
    } catch (error: any) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200);
    } catch (error: any) {
      next(error);
    }
  }
}
