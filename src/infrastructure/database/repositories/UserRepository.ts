// src/infrastructure/database/UserRepository.ts
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  private users: User[] = []; // Simulación de base de datos en memoria

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async getByEmail(email: string): Promise<any> {
    return {
      name: "name",
      email: email,
      password: "password",
    };
  }
}
