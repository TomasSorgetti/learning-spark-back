import { NextFunction, Request, Response } from "express";
import { validateUserData } from "../../../shared/validators/userValidator";
import { LoginUseCase } from "../../../application/use-cases/loginUseCase";
import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUserUseCase";
import { VerifyUserUseCase } from "../../../application/use-cases/VerifyUserUseCase";
import { LogoutUseCase } from "../../../application/use-cases/LogoutUseCase";
import { ProfileUseCase } from "../../../application/use-cases/ProfileUseCase";
import { RefreshUseCase } from "../../../application/use-cases/refreshUseCase";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export class AuthController {
  private loginUseCase: LoginUseCase;
  private registerUserUseCase: RegisterUserUseCase;
  private verifyUserUseCase: VerifyUserUseCase;
  private logoutUseCase: LogoutUseCase;
  private profileUseCase: ProfileUseCase;
  private refreshUseCase: RefreshUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.registerUserUseCase = new RegisterUserUseCase();
    this.verifyUserUseCase = new VerifyUserUseCase();
    this.logoutUseCase = new LogoutUseCase();
    this.profileUseCase = new ProfileUseCase();
    this.refreshUseCase = new RefreshUseCase();
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      validateUserData({ name, email, password });

      const response = await this.registerUserUseCase.execute(res, {
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
      //TODO=> add session id?

      const response = await this.verifyUserUseCase.execute(userId, code);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async logout(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const sessionId = req.sessionId || "";

      const response = await this.logoutUseCase.execute(res, sessionId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async profile(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId || "";

      const response = await this.profileUseCase.execute(userId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async refresh(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId || "";
      const sessionId = req.sessionId || "";

      const response = await this.refreshUseCase.execute(
        userId,
        sessionId,
        res
      );
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
