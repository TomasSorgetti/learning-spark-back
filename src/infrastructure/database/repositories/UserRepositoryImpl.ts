import { IUser, UserModel } from "../models/UserSchema";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import mongoose from "mongoose";

export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).populate("roles", "name").exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).populate("roles", "name").exec();
  }

  async findAll(): Promise<IUser[] | []> {
    return UserModel.find().populate("roles", "name").exec();
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    const newUser = new UserModel(user);

    return await newUser.save();
  }
  
  async cancelCreate(userId: string): Promise<any> {
    return await UserModel.deleteOne({ _id: userId });
  }

  async changePassword(
    userId: string,
    hashedNewPassword: string
  ): Promise<any> {
    return await UserModel.findOneAndUpdate(
      { _id: userId },
      { password: hashedNewPassword },
      { new: true }
    );
  }

  async verifyUser(userId: string): Promise<any> {
    return await UserModel.findOneAndUpdate(
      { _id: userId },
      { validated: true },
      { new: true }
    );
  }
}
