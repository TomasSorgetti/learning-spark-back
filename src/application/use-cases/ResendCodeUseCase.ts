import { Response } from "express";
import { CookieService } from "../../infrastructure/services/CookieService";
import { EmailService } from "../../infrastructure/services/EmailService";
import { UserService } from "../services/UserService";
import { VerificationCodeService } from "../services/VerificationCodeService";
import { APIError, BadRequestError } from "../../shared/utils/app-errors";

export class ResendCodeUseCase {
  private userService: UserService;
  private emailService: EmailService;
  private verificationCodeService: VerificationCodeService;
  private cookieService: CookieService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();
    this.verificationCodeService = new VerificationCodeService();
    this.cookieService = new CookieService();
  }

  async execute(res: Response, userId: string): Promise<any> {
    if (!userId) {
      throw new BadRequestError("Fields are required.");
    }
    const user = await this.userService.getUserById(userId);
    if (user && user.deleted) {
      throw new BadRequestError("User not found.");
    }
    if (user.isVerified) {
      throw new APIError("User is already verified");
    }

    const updatedVerificationCode =
      await this.verificationCodeService.updateVerificationCode(userId, 6);


    if (!updatedVerificationCode) {
      console.log("Failed to update verification code.");
      throw new APIError("Failed to update verification code.");
    }

    try {
      await this.emailService.sendEmail(
        user.email,
        `New verification code. ${updatedVerificationCode.code}`,
        `Your new verification code is: ${updatedVerificationCode.code}. The code will expire in 10 minutes.`
      );

      this.cookieService.createCookie(
        res,
        "emailVerification",
        JSON.stringify({
          userId: user._id,
          codeExpiresAt: updatedVerificationCode.expiresAt,
        }),
        {
          httpOnly: false,
          secure: true,
          maxAge: 10 * 60 * 1000, // 10 minutes
          sameSite: "Strict",
          path: "/",
        }
      );
    } catch (error) {
      throw new APIError("Failed to send email. Try again later.");
    }

    return { message: "Verification code resent successfully." };
  }
}
