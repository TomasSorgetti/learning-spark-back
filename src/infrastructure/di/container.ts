// Repositories imports
import { UserRepositoryImpl } from "../database/repositories/UserRepositoryImpl";
import { VerificationCodeRepositoryImpl } from "../database/repositories/VerificationCodeImpl";
import { RoleRepositoryImpl } from "../database/repositories/RoleRepositoryImpl";
import { SessionRepositoryImpl } from "../database/repositories/SessionRepositoryImpl";

// Services imports
import { RoleService } from "../../application/services/RoleService";
import { SessionService } from "../../application/services/SessionService";
import { UserService } from "../../application/services/UserService";
import { VerificationCodeService } from "../../application/services/VerificationCodeService";
import { CookieService } from "../services/CookieService";
import { EmailService } from "../services/EmailService";
import { SecurityService } from "../services/SecurityService";
import { TokenService } from "../services/TokenService";

// Use Cases imports
import { ChangePasswordUseCase } from "../../application/use-cases/user/ChangePasswordUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { LoginUseCase } from "../../application/use-cases/auth/loginUseCase";
import { LogoutUseCase } from "../../application/use-cases/auth/LogoutUseCase";
import { RefreshUseCase } from "../../application/use-cases/auth/refreshUseCase";
import { RegisterUserUseCase } from "../../application/use-cases/auth/RegisterUserUseCase";
import { ResendCodeUseCase } from "../../application/use-cases/auth/ResendCodeUseCase";
import { VerifyUserUseCase } from "../../application/use-cases/auth/VerifyUserUseCase";
import { ProfileUseCase } from "../../application/use-cases/auth/ProfileUseCase";
import { CategoryService } from "../../application/services/CategoryService";
import { PostService } from "../../application/services/PostService";
import { PostRepositoryImpl } from "../database/repositories/PostRespositoryImpl";
import { SubjectService } from "../../application/services/SubjectService";
import { SubjectRepositoryImpl } from "../database/repositories/SubjectRepositoryImpl";
import { SubSubjectService } from "../../application/services/SubSubjectService";
import { SubSubjectRepositoryImpl } from "../database/repositories/SubSubjectRepositoryImpl";
import { GoogleAuthUseCase } from "../../application/use-cases/auth/GoogleAuthUseCase";
import { GoogleAuthService } from "../services/GoogleAuthService";
import { CloudinaryService } from "../services/CloudinaryService";

// Repository instances
const userRepository = new UserRepositoryImpl();
const verificationCodeRepository = new VerificationCodeRepositoryImpl();
const roleRepository = new RoleRepositoryImpl();
const sessionRepository = new SessionRepositoryImpl();
const postRepository = new PostRepositoryImpl();
const subjectRepository = new SubjectRepositoryImpl();
const subSubjectRepository = new SubSubjectRepositoryImpl();

// Service instances
const roleService = new RoleService(roleRepository);
const emailService = new EmailService();
const verificationCodeService = new VerificationCodeService(
  verificationCodeRepository
);
const cookieService = new CookieService();
const securityService = new SecurityService();
const tokenService = new TokenService();
const sessionService = new SessionService(sessionRepository);
const userService = new UserService(securityService, userRepository);
const categoryService = new CategoryService();
const cloudinaryService = new CloudinaryService();
const postService = new PostService(postRepository, cloudinaryService);
const subjectService = new SubjectService(subjectRepository);
const subSubjectService = new SubSubjectService(subSubjectRepository);
const googleAuthService = new GoogleAuthService();

// Auth Use Cases
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

const googleAuthUseCase = new GoogleAuthUseCase(
  googleAuthService,
  userService,
  roleService,
  securityService,
  tokenService,
  sessionService,
  cookieService
);

// User Use Cases
const changePasswordUseCase = new ChangePasswordUseCase(
  userService,
  emailService,
  securityService
);
const getAllUsersUseCase = new GetAllUsersUseCase(userService);

export const container = {
  cloudinaryService,
  userService,
  sessionService,
  tokenService,
  googleAuthService,
  roleService,
  categoryService,
  postService,
  subjectService,
  subSubjectService,
  registerUserUseCase,
  loginUseCase,
  verifyUserUseCase,
  logoutUseCase,
  profileUseCase,
  refreshUseCase,
  googleAuthUseCase,
  resendCodeUseCase,
  changePasswordUseCase,
  getAllUsersUseCase,
};
