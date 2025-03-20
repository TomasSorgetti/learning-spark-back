import { BadRequestError } from "../../../shared/utils/app-errors";
import { UserService } from "../../services/UserService";

export class ProfileUseCase {
  constructor(private readonly userService: UserService) {}

  public async execute(userId: string): Promise<any> {
    if (!userId) {
      throw new BadRequestError("Fields are required.");
    }
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }
    if (user && user.deleted) {
      throw new BadRequestError("User deleted");
    }
    if (user && !user.emailVerified) {
      throw new BadRequestError("User not validated");
    }

    return {
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }
}
