import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      const response = await this.userService.createUser({ name, email });
      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
