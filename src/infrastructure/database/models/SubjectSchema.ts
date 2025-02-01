import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
  name: string;
  freeSubscriptionId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    freeSubscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
  },
  {
    timestamps: true,
  }
);

export const SubjectModel = mongoose.model<ISubject>("Subject", SubjectSchema);
