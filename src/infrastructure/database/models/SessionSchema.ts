import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User",
    },
    userAgent: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: {
      type: Date,
      default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  },
  {
    timestamps: true,
  }
);

export const SessionModel = mongoose.model<ISession>("Session", SessionSchema);
