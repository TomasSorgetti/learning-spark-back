import mongoose from "mongoose";
import { User } from "../../domain/entities/User";
import { ConflictError, GoneError } from "../../shared/utils/app-errors";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { SecurityService } from "../services/SecurityService";

export class CreateUserUseCase {
  private userRepository: UserRepositoryImpl;
  private securityService: SecurityService;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.securityService = new SecurityService();
  }

  async execute(userData: {
    name: string;
    email: string;
    password: string;
    roles: mongoose.Types.ObjectId[];
  }): Promise<any> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      if (existingUser.deleted) {
        throw new GoneError("User deleted");
      }
      throw new ConflictError("User already exists");
    }

    const hashedPassword = await this.securityService.hashPassword(
      userData.password
    );

    const user = new User(
      userData.name,
      userData.email,
      hashedPassword,
      userData.roles
    );
    // Retornar user
    return await this.userRepository.create(user.toPrimitives());
  }
}
