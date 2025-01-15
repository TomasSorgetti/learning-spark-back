import mongoose from "mongoose";
import { User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import {
  BadRequestError,
  ConflictError,
  GoneError,
} from "../../shared/utils/app-errors";
import { SecurityService } from "./SecurityService";
import { CreateUserUseCase } from "../use-cases/CreateUserUseCase";

export class UserService {
  private userRepository: UserRepositoryImpl;
  private createUserUseCase: CreateUserUseCase;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.createUserUseCase = new CreateUserUseCase();
  }

  public async createUser(userData: {
    name: string;
    email: string;
    password: string;
    roles: mongoose.Types.ObjectId[];
  }): Promise<any> {
    return this.createUserUseCase.execute(userData);
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }
}
