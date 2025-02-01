import { UserService } from "../services/UserService";
import { ILoginUser } from "../interfaces/IAuthService";
import { SecurityService } from "../../infrastructure/services/SecurityService";
import {
  NotFoundError,
  GoneError,
  UnauthorizedError,
} from "../../shared/utils/app-errors";
import { TokenService } from "../../infrastructure/services/TokenService";
import { SessionService } from "../services/SessionService";

export class LoginUseCase {
  private userService: UserService;
  private securityService: SecurityService;
  private tokenService: TokenService;
  private sessionService: SessionService;

  constructor() {
    this.userService = new UserService();
    this.securityService = new SecurityService();
    this.tokenService = new TokenService();
    this.sessionService = new SessionService();
  }

  public async execute(userData: ILoginUser): Promise<any> {
    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (!existingUser) {
      throw new NotFoundError("Email not found");
    }
    if (existingUser && existingUser.deleted) {
      throw new GoneError("User deleted");
    }

    const isPasswordValid = await this.securityService.comparePasswords(
      userData.password,
      existingUser.getPassword()
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Incorrect password");
    }

    // create session
    const session = await this.sessionService.createSession({
      userId: existingUser._id,
    });
    if (!session) {
      throw new UnauthorizedError("Error creating session");
    }
    
    // create access & refresh token
    const accessToken = this.tokenService.generateAccessToken({
      // sub: existingUser.getId(),
      // email: existingUser.getEmail(),
      // roles: existingUser.getRoles(),
    });
    const refreshToken = this.tokenService.generateRefreshToken(
      {
        // sub: existingUser.getId(),
        // email: existingUser.getEmail(),
        // roles: existingUser.getRoles(),
      },
      userData.rememberme
    );

    return {
      user: existingUser.toPrimitives(),
      accessToken,
      refreshToken,
    };
  }
}
