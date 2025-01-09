import { IUser, UserModel } from "../models/UserSchema";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    const newUser = new UserModel(user);
    return newUser.save();
  }
}
