import { NextFunction, Request, Response } from "express";
import { ChangePasswordUseCase } from "../../../application/use-cases/user/ChangePasswordUseCase";
import { GetAllUsersUseCase } from "../../../application/use-cases/user/GetAllUsersUseCase";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export class UserController {
  constructor(
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase
  ) {}

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.getAllUsersUseCase.execute();
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
