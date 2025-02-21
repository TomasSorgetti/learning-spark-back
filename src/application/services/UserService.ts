import mongoose from "mongoose";
import { User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import {
  APIError,
  ConflictError,
  GoneError,
} from "../../shared/utils/app-errors";
import { IUser } from "../../infrastructure/database/models/users/UserSchema";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import { IUserData } from "../types/IUserService";

export class UserService {
  constructor(
    private readonly securityService: SecurityService,
    private readonly userRepository: UserRepositoryImpl
  ) {}

  public async createUser(userData: IUserData): Promise<IUser> {
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

    const validRoles = userData.roles.filter((role) =>
      mongoose.Types.ObjectId.isValid(role)
    );

    if (validRoles.length !== userData.roles.length) {
      throw new APIError("Invalid role(s) provided");
    }

    const user = new User(
      userData.name,
      userData.email,
      hashedPassword,
      userData.roles
    );

    const userPrimitives = user.toPrimitives();

    return await this.userRepository.create(userPrimitives);
  }

  public async cancelCreate(userId: string): Promise<any> {
    return await this.userRepository.cancelCreate(userId);
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }

  public async getUserById(userId: string): Promise<any> {
    return await this.userRepository.findById(userId);
  }

  public async getAllUsers(): Promise<any[]> {
    return await this.userRepository.findAll();
  }

  public async verifyUser(userId: string): Promise<any> {
    return await this.userRepository.verifyUser(userId);
  }

  public async updateLoginAttempts(
    userId: string,
    attempts: number
  ): Promise<any> {
    return await this.userRepository.updateLoginAttempts(userId, attempts);
  }

  public async updateLockUntil(
    userId: string,
    lockUntil: Date | null
  ): Promise<any> {
    return await this.userRepository.updateLockUntil(userId, lockUntil);
  }

  public async changePassword(
    userId: string,
    hashedNewPassword: string
  ): Promise<any> {
    return await this.userRepository.changePassword(userId, hashedNewPassword);
  }
}
