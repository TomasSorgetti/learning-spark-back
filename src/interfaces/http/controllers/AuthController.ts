import { NextFunction, Request, Response } from "express";
import { validateUserData } from "../../../shared/validators/userValidator";
import { LoginUseCase } from "../../../application/use-cases/loginUseCase";
import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUserUseCase";
import { VerifyUserUseCase } from "../../../application/use-cases/VerifyUserUseCase";
import { LogoutUseCase } from "../../../application/use-cases/LogoutUseCase";

export class AuthController {
  private loginUseCase: LoginUseCase;
  private registerUserUseCase: RegisterUserUseCase;
  private verifyUserUseCase: VerifyUserUseCase;
  private logoutUseCase: LogoutUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.registerUserUseCase = new RegisterUserUseCase();
    this.verifyUserUseCase = new VerifyUserUseCase();
    this.logoutUseCase = new LogoutUseCase();
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
      const userAgent = req.get("User-Agent") || "";

      const user = await this.loginUseCase.execute(
        res,
        {
          email,
          password,
          rememberme,
        },
        userAgent
      );
      return res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, code } = req.body;

      const response = await this.verifyUserUseCase.execute(userId, code);
      return res.status(200).json(response);
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
      const userId = "";
      const response = await this.logoutUseCase.execute(res, userId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
