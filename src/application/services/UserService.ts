import mongoose from "mongoose";
import { User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import {
  BadRequestError,
  ConflictError,
  GoneError,
} from "../../shared/utils/app-errors";
import { SecurityService } from "./SecurityService";

export class UserService {
  private userRepository: UserRepositoryImpl;
  private securityService: SecurityService;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.securityService = new SecurityService();
  }

  public async createUser(userData: {
    name: string;
    email: string;
    password: string;
    roles: mongoose.Types.ObjectId[];
  }): Promise<any> {
    // Validar que el email no exista
    const existingUser = await this.userRepository.findByEmail(userData.email);
    // Si esta eliminado
    if (existingUser && existingUser.deleted) {
      throw new GoneError("User deleted");
    } else if (existingUser) {
      // Si existe, retornar error
      throw new ConflictError("User already exists");
    }
    // Si no existe, Encriptar password
    const hashedPassword = await this.securityService.hashPassword(
      userData.password
    );
    // Guardar user
    const user = new User(
      userData.name,
      userData.email,
      hashedPassword,
      userData.roles
    );
    // Retornar user
    return await this.userRepository.create(user.toPrimitives());
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }
}
