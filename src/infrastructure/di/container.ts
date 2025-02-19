import { RoleService } from "../../application/services/RoleService";
import { SessionService } from "../../application/services/SessionService";
import { UserService } from "../../application/services/UserService";
import { VerificationCodeService } from "../../application/services/VerificationCodeService";
import { LoginUseCase } from "../../application/use-cases/auth/loginUseCase";
import { LogoutUseCase } from "../../application/use-cases/auth/LogoutUseCase";
import { RefreshUseCase } from "../../application/use-cases/auth/refreshUseCase";
import { RegisterUserUseCase } from "../../application/use-cases/auth/RegisterUserUseCase";
import { ResendCodeUseCase } from "../../application/use-cases/auth/ResendCodeUseCase";
import { VerifyUserUseCase } from "../../application/use-cases/auth/VerifyUserUseCase";
import { ProfileUseCase } from "../../application/use-cases/auth/ProfileUseCase";
import { CookieService } from "../services/CookieService";
import { EmailService } from "../services/EmailService";
import { SecurityService } from "../services/SecurityService";
import { TokenService } from "../services/TokenService";

const roleService = new RoleService();
const userService = new UserService();
const emailService = new EmailService();
const verificationCodeService = new VerificationCodeService();
const cookieService = new CookieService();
const securityService = new SecurityService();
const tokenService = new TokenService();
const sessionService = new SessionService();

const registerUserUseCase = new RegisterUserUseCase(
  roleService,
  userService,
  emailService,
  verificationCodeService,
  cookieService
);

const loginUseCase = new LoginUseCase(
  userService,
  securityService,
  tokenService,
  sessionService,
  cookieService
);
const verifyUserUseCase = new VerifyUserUseCase(
  verificationCodeService,
  userService,
  emailService
);
const logoutUseCase = new LogoutUseCase(sessionService, cookieService);
const profileUseCase = new ProfileUseCase(userService);
const refreshUseCase = new RefreshUseCase(
  userService,
  cookieService,
  tokenService
);
const resendCodeUseCase = new ResendCodeUseCase(
  userService,
  emailService,
  verificationCodeService,
  cookieService
);

export const container = {
  registerUserUseCase,
  loginUseCase,
  verifyUserUseCase,
  logoutUseCase,
  profileUseCase,
  refreshUseCase,
  resendCodeUseCase,
};
