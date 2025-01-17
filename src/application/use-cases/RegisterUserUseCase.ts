import mongoose from "mongoose";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import { UserService } from "../services/UserService";
import { EmailService } from "../../infrastructure/services/EmailService";
import { IUser } from "../../infrastructure/database/models/UserSchema";
import { UnavailableError } from "../../shared/utils/app-errors";
import { IUserData } from "../interfaces/IUserService";

export class RegisterUserUseCase {
  private userService: UserService;
  private securityService: SecurityService;
  private emailService: EmailService;

  constructor() {
    this.userService = new UserService();
    this.securityService = new SecurityService();
    this.emailService = new EmailService();
  }

  async execute(userData: IUserData): Promise<IUser> {
    const transaction = await this.userService.startTransaction();

    try {
      const user = await this.userService.createUser(
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          roles: userData.roles,
        },
        transaction
      );

      const verificationCode = this.securityService.generateVerificationCode(6);

      await this.emailService.sendEmail(
        userData.email,
        "Verification code",
        `Your verification code is: ${verificationCode}`
      );

      await transaction.commitTransaction();

      return user;
    } catch (error) {
      await transaction.abortTransaction();
      transaction.endSession();
      throw new UnavailableError("Error creating user or sending email");
    }
  }
}
