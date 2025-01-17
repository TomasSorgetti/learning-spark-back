import mongoose from "mongoose";
import { User } from "../../domain/entities/User";
import { SecurityService } from "../services/SecurityService";
import { UserService } from "../services/UserService";

export class RegisterUserUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async execute(userData: {
    name: string;
    email: string;
    password: string;
    roles: mongoose.Types.ObjectId[];
  }): Promise<any> {
    const user = await this.userService.createUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      roles: userData.roles,
    });

    // todo => send email verification code
    return user;
  }
}
