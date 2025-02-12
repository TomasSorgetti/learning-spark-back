import mongoose from "mongoose";
import { IUser } from "../../infrastructure/database/models/users/UserSchema";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: Partial<IUser>, session: mongoose.ClientSession): Promise<IUser>;
  verifyUser(userId: string): Promise<IUser>;
}
