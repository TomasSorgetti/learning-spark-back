import mongoose from "mongoose";

export interface IUserData {
  name: string;
  email: string;
  password: string | null;
  roles: mongoose.Types.ObjectId[];
  emailVerified?: boolean;
  provider?: string | null;
}
