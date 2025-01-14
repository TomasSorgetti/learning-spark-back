import { NextFunction, Request, Response } from "express";
import { UserService } from "../../../application/services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json();
    } catch (error: any) {
      next(error);
    }
  }
}
