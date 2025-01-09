import { User } from "../../domain/entities/User";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";

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
    return await this.userRepository.save(user);
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.getByEmail(email);
  }
}
