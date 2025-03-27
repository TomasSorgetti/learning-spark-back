import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string | null;
  name: string;
  roles: mongoose.Types.ObjectId[];
  emailVerified: boolean;
  deleted: boolean;
  loginAttempts: number;
  lockUntil: Date | null;
  purchasedSubTopics: {
    subTopicId: mongoose.Types.ObjectId;
    purchasedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  provider: string | null;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, default: null },
    name: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    ],
    emailVerified: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Date, default: null },
    purchasedSubTopics: [
      { subTopicId: mongoose.Types.ObjectId, purchasedAt: Date },
    ],
    provider: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
