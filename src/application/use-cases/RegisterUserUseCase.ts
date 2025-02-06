import { UserService } from "../services/UserService";
import { EmailService } from "../../infrastructure/services/EmailService";
import { IUser } from "../../infrastructure/database/models/UserSchema";
import { APIError, UnavailableError } from "../../shared/utils/app-errors";
import { VerificationCodeService } from "../services/VerificationCodeService";
import mongoose from "mongoose";
import { serverConfig } from "../../infrastructure/config";
import { RoleService } from "../services/RoleService";
import { IRegisterUser } from "../interfaces/IAuthService";
import { CookieService } from "../../infrastructure/services/CookieService";
import { Response } from "express";

export class RegisterUserUseCase {
  private roleService: RoleService;
  private userService: UserService;
  private emailService: EmailService;
  private verificationCodeService: VerificationCodeService;
  private cookieService: CookieService;

  constructor() {
    this.roleService = new RoleService();
    this.userService = new UserService();
    this.emailService = new EmailService();
    this.verificationCodeService = new VerificationCodeService();
    this.cookieService = new CookieService();
  }

  async execute(res: Response, userData: IRegisterUser): Promise<IUser> {
    const roleId = await this.assignDefaultRole(userData.email);
    const userDataWithRole = { ...userData, roles: [roleId] };

    const user = await this.userService.createUser({
      name: userDataWithRole.name,
      email: userDataWithRole.email,
      password: userDataWithRole.password,
      roles: userDataWithRole.roles,
    });

    if (!user) {
      throw new UnavailableError("Error creating user");
    }

    try {
      const verificationCode =
        await this.verificationCodeService.createVerificationCode(
          user._id as string,
          6
        );

      await this.emailService.sendEmail(
        userDataWithRole.email,
        "Verification code",
        `Your verification code is: ${verificationCode.code}. The code will expire in 10 minutes. RUUUNN!`
      );

      this.cookieService.createCookie(
        res,
        "emailVerification",
        JSON.stringify({
          userId: user._id,
          codeExpiresAt: verificationCode.expiresAt,
        }),
        {
          httpOnly: false,
          secure: true,
          maxAge: 20 * 60 * 1000, // 20 minutes
          sameSite: "Strict",
          path: "/",
        }
      );

      return user;
    } catch (error) {
      await this.userService.cancelCreate(user._id as string);
      throw new UnavailableError(
        "Error creating verification code or sending email"
      );
    }
  }

  private async assignDefaultRole(
    email: string
  ): Promise<mongoose.Types.ObjectId> {
    const roleName = email === serverConfig.OWNER_EMAIL ? "admin" : "user";
    const role = await this.roleService.getRoleByName(roleName);

    if (!role) {
      throw new APIError(`Role "${roleName}" not found`);
    }

    if (!mongoose.Types.ObjectId.isValid(role._id)) {
      throw new APIError(`Invalid ObjectId for role "${roleName}"`);
    }

    return role._id;
  }
}
