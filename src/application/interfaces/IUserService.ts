import mongoose from "mongoose";

export interface IUserData {
  name: string;
  email: string;
  password: string;
  roles: mongoose.Types.ObjectId[];
}
