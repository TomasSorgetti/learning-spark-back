import { UserService } from "./UserService";
import { RoleService } from "./RoleService";
import { serverConfig } from "../../infrastructure/config";
import mongoose from "mongoose";
import { APIError, BadRequestError } from "../../shared/utils/app-errors";

export class AuthService {
  private userService: UserService;
  private roleService: RoleService;

  constructor() {
    this.userService = new UserService();
    this.roleService = new RoleService();
  }

  public async login(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    return await this.userService.getUserByEmail(userData.email);
  }

  public async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    const roleId = await this.assignDefaultRole(userData.email);
    const userDataWithRole = { ...userData, roles: [roleId] };

    const user = await this.userService.createUser(userDataWithRole);
    if (!user) {
      throw new BadRequestError("Error creating user");
    }
    // todo => send email verification
    return user;
  }

  public async verify(): Promise<any> {}

  public async profile(): Promise<any> {}

  public async logout(): Promise<any> {}

  private async assignDefaultRole(
    email: string
  ): Promise<mongoose.Types.ObjectId> {
    const roleName = email === serverConfig.ADMIN_EMAIL ? "admin" : "user";
    const role = await this.roleService.getRole(roleName);
    if (!role) {
      throw new APIError(`Role "${roleName}" not found`);
    }
    return role._id;
  }
}
