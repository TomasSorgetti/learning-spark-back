import { NextFunction, Request, Response } from "express";
import { UserService } from "../../../application/services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userService.getAllUsers();
      return res.status(201).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
