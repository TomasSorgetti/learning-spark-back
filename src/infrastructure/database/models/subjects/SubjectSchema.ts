import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const SubjectModel = mongoose.model<ISubject>("Subject", SubjectSchema);
