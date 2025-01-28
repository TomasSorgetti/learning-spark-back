import mongoose from "mongoose";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import { UserService } from "../services/UserService";
import { EmailService } from "../../infrastructure/services/EmailService";
import { IUser } from "../../infrastructure/database/models/UserSchema";
import { UnavailableError } from "../../shared/utils/app-errors";
import { IUserData } from "../interfaces/IUserService";
import { VerificationCodeService } from "../services/VerificationCodeService";

export class RegisterUserUseCase {
  private userService: UserService;
  private emailService: EmailService;
  private verificationCodeService: VerificationCodeService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();
    this.verificationCodeService = new VerificationCodeService();
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
      if (!user) {
        throw new UnavailableError("Error creating user");
      }
      const verificationCode =
        this.verificationCodeService.createVerificationCode(
          user._id as string,
          6
        );

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
