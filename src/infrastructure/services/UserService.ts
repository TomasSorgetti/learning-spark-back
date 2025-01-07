import { User } from "../../domain/entities/User";
import { UserRepository } from "../database/repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(userData: {
    name: string;
    email: string;
  }): Promise<any> {
    const user = new User(userData.name, userData.email);
    return this.userRepository.save(user);
  }
}
