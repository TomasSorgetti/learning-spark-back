import { NextFunction, Request, Response } from "express";
import { UserService } from "../../../application/services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const response = await this.userService.createUser({
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
