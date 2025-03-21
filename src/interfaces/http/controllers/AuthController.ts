import { NextFunction, Request, Response } from "express";
import { validateUserData } from "../../../shared/validators/userValidator";
import { LoginUseCase } from "../../../application/use-cases/auth/loginUseCase";
import { VerifyUserUseCase } from "../../../application/use-cases/auth/VerifyUserUseCase";
import { LogoutUseCase } from "../../../application/use-cases/auth/LogoutUseCase";
import { ProfileUseCase } from "../../../application/use-cases/auth/ProfileUseCase";
import { RefreshUseCase } from "../../../application/use-cases/auth/refreshUseCase";
import { ResendCodeUseCase } from "../../../application/use-cases/auth/ResendCodeUseCase";
import { RegisterUserUseCase } from "../../../application/use-cases/auth/RegisterUserUseCase";
import passport from "passport";
import { GoogleAuthUseCase } from "../../../application/use-cases/auth/GoogleAuthUseCase";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyUserUseCase: VerifyUserUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly profileUseCase: ProfileUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly resendCodeUseCase: ResendCodeUseCase,
    private readonly googleAuthUseCase: GoogleAuthUseCase
  ) {}

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

  public async resendCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;

      const response = await this.resendCodeUseCase.execute(res, userId);
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
      const rememberme = req.query.rememberme === "true" ? true : false;
      const userId = req.userId || "";
      const sessionId = req.sessionId || "";

      const response = await this.refreshUseCase.execute(
        rememberme,
        userId,
        sessionId,
        res
      );
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public googleLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account",
    })(req, res, next);
  }

  public async googleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { failureRedirect: "/v1/auth/signin" })(
      req,
      res,
      async () => {
        try {
          const userAgent = req.get("User-Agent") || "";
          const user = await this.googleAuthUseCase.execute(
            res,
            req.user,
            userAgent
          );
          if (user) {
            res.redirect("http://localhost:3000/en/auth/login?success=true");
          }
        } catch (error: any) {
          const errorMessage = encodeURIComponent(
            error.message || "Unknown error"
          );
          res.redirect(
            `http://localhost:3000/en/auth/login?error=${errorMessage}`
          );
        }
      }
    );
  }
}
