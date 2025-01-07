import { User } from "../../domain/entities/User";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import { APIError } from "../../shared/utils/app-errors";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(userData: {
    name: string;
    email: string;
  }): Promise<any> {
    throw new APIError("Testing error handler", 400);
    const user = new User(userData.name, userData.email);
    return this.userRepository.save(user);
  }
}
