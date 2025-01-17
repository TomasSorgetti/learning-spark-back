import mongoose from "mongoose";
import { User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { ConflictError, GoneError } from "../../shared/utils/app-errors";
import { IUser } from "../../infrastructure/database/models/UserSchema";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import { IUserData } from "../interfaces/IUserService";

export class UserService {
  private securityService: SecurityService;
  private userRepository: UserRepositoryImpl;
  constructor() {
    this.securityService = new SecurityService();
    this.userRepository = new UserRepositoryImpl();
  }

  public async createUser(
    userData: IUserData,
    transaction?: mongoose.ClientSession
  ): Promise<IUser> {
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

    return await this.userRepository.create(user.toPrimitives(), transaction);
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }

  public async startTransaction(): Promise<mongoose.ClientSession> {
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
  }
}
