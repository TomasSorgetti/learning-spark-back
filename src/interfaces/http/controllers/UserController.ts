import { NextFunction, Request, Response } from "express";
import { UserService } from "../../../application/services/UserService";
import { ChangePasswordUseCase } from "../../../application/use-cases/ChangePasswordUseCase";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export class UserController {
  private userService: UserService;
  private changePasswordUseCase: ChangePasswordUseCase;

  constructor() {
    this.userService = new UserService();
    this.changePasswordUseCase = new ChangePasswordUseCase();
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userService.getAllUsers();
      return res.status(201).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async changePassword(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { password, newPassword } = req.body;
      const userId = req.userId || "";

      const response = await this.changePasswordUseCase.execute(
        userId,
        password,
        newPassword
      );
      return res.status(201).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
