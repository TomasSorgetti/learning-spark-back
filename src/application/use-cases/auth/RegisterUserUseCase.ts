import { UserService } from "../../services/UserService";
import { EmailService } from "../../../infrastructure/services/EmailService";
import { IUser } from "../../../infrastructure/database/models/users/UserSchema";
import { APIError, UnavailableError } from "../../../shared/utils/app-errors";
import { VerificationCodeService } from "../../services/VerificationCodeService";
import mongoose from "mongoose";
import { serverConfig } from "../../../infrastructure/config";
import { RoleService } from "../../services/RoleService";
import { IRegisterUser } from "../../types/IAuthService";
import { CookieService } from "../../../infrastructure/services/CookieService";
import { Response } from "express";

export class RegisterUserUseCase {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly verificationCodeService: VerificationCodeService,
    private readonly cookieService: CookieService
  ) {}

  async execute(
    res: Response,
    userData: IRegisterUser
  ): Promise<Partial<IUser>> {
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
        `Verification code. ${verificationCode.code}`,
        `Your verification code is: ${verificationCode.code}. The code will expire in 10 minutes.`
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
          maxAge: 10 * 60 * 1000, // 10 minutes
          sameSite: "Strict",
          path: "/",
        }
      );

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        createdAt: user.createdAt,
      };
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
