import { UserService } from "../../services/UserService";

export class GetAllUsersUseCase {
  constructor(private readonly userService: UserService) {}

  public async execute(): Promise<any> {
    return await this.userService.getAllUsers();
  }
}
