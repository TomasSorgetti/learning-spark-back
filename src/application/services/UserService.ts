import { User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";

export class UserService {
  private userRepository: UserRepositoryImpl;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  public async createUser(userData: {
    name: string;
    email: string;
  }): Promise<any> {
    const user = new User(userData.name, userData.email);
    // return await this.userRepository.create(user);
    return user;
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }
}
