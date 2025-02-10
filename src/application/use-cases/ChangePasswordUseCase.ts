import { EmailService } from "../../infrastructure/services/EmailService";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import { APIError, BadRequestError } from "../../shared/utils/app-errors";
import { UserService } from "../services/UserService";

export class ChangePasswordUseCase {
  private userService: UserService;
  private emailService: EmailService;
  private securityService: SecurityService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();
    this.securityService = new SecurityService();
  }

  public async execute(
    userId: string,
    password: string,
    newPassword: string
  ): Promise<any> {
    console.log("ChangePasswordUseCase", userId, password, newPassword);

    if (!userId || !password || !newPassword) {
      throw new BadRequestError("Missing required fields");
    }
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestError("User not found");

    const isPasswordValid = await this.securityService.comparePasswords(
      password,
      user.password
    );
    //? should notify user that password is incorrect???
    if (!isPasswordValid) throw new BadRequestError("Incorrect password");

    const hashedNewPassword = await this.securityService.hashPassword(
      newPassword
    );

    try {
      await this.userService.changePassword(userId, hashedNewPassword);
    } catch (error) {
      throw new APIError("Error changing password");
    }

    try {
      await this.emailService.sendEmail(
        user.email,
        "Password changed",
        "Your password has been successfully changed."
      );
    } catch (error) {
      throw new APIError("Error sending email");
    }

    return { message: "Password changed successfully" };
  }
}
