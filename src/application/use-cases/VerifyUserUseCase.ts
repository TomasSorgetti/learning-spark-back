import { EmailService } from "../../infrastructure/services/EmailService";
import { BadRequestError } from "../../shared/utils/app-errors";
import { UserService } from "../services/UserService";
import { VerificationCodeService } from "../services/VerificationCodeService";

export class VerifyUserUseCase {
  private verificationCodeService: VerificationCodeService;
  private userService: UserService;
  private emailService: EmailService;

  constructor() {
    this.verificationCodeService = new VerificationCodeService();
    this.userService = new UserService();
    this.emailService = new EmailService();
  }

  public async execute(userId: string, code: string): Promise<any> {
    const isCodeValid =
      await this.verificationCodeService.verifyVerificationCode(userId, code);

    if (!isCodeValid) {
      throw new BadRequestError("Invalid or expired verification code.");
    }

    const user = await this.userService.verifyUser(userId);

    await this.emailService.sendEmail(
      user.email,
      "Account Verified",
      "Your account has been successfully verified."
    );

    return { message: "User verified successfully." };
  }
}
