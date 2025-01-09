import { UserService } from "./UserService";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
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
    return await this.userService.getUserByEmail(userData.email);
  }

  public async verify(): Promise<any> {}

  public async profile(): Promise<any> {}

  public async logout(): Promise<any> {}
}
