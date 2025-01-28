import { RoleService } from "./RoleService";
import { serverConfig } from "../../infrastructure/config";
import mongoose from "mongoose";
import {
  APIError,
  BadRequestError,
  GoneError,
  NotFoundError,
} from "../../shared/utils/app-errors";
import { IUser } from "../../infrastructure/database/models/UserSchema";
import { RegisterUserUseCase } from "../use-cases/RegisterUserUseCase";
import { ILoginUser, IRegisterUser } from "../interfaces/IAuthService";
import { UserService } from "./UserService";
import { LoginUseCase } from "../use-cases/loginUseCase";

export class AuthService {
  private roleService: RoleService;
  private registerUserUseCase: RegisterUserUseCase;
  private userService: UserService;
  private loginUseCase: LoginUseCase;

  constructor() {
    this.roleService = new RoleService();
    this.userService = new UserService();
    this.registerUserUseCase = new RegisterUserUseCase();
    this.loginUseCase = new LoginUseCase();
  }

  public async login(userData: ILoginUser): Promise<any> {
    const { user, accessToken, refreshToken } = await this.loginUseCase.execute(
      userData
    );

    //
    //

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async register(userData: IRegisterUser): Promise<IUser> {
    const roleId = await this.assignDefaultRole(userData.email);
    const userDataWithRole = { ...userData, roles: [roleId] };

    const user = await this.registerUserUseCase.execute(userDataWithRole);
    if (!user) {
      throw new BadRequestError("Error creating user");
    }
    return user;
  }

  private async assignDefaultRole(
    email: string
  ): Promise<mongoose.Types.ObjectId> {
    const roleName = email === serverConfig.OWNER_EMAIL ? "admin" : "user";
    const role = await this.roleService.getRole(roleName);
    if (!role) {
      throw new APIError(`Role "${roleName}" not found`);
    }
    return role._id;
  }

  public async verify(): Promise<any> {}

  public async profile(): Promise<any> {}

  public async logout(): Promise<any> {}
}
