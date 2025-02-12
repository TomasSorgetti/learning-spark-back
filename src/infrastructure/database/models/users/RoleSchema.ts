import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
