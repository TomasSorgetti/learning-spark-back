import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUser } from "../../infrastructure/database/models/UserSchema";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: Partial<IUser>): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }
    return this.userRepository.create(userData);
  }
}
