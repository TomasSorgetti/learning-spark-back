import { IUser } from "../../infrastructure/database/models/UserSchema";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: Partial<IUser>): Promise<IUser>;
}
