import mongoose, { Schema, Document } from "mongoose";

export interface IVerificationCode extends Document {
  userId: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}

const VerificationCodeSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    code: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const VerificationCodeModel = mongoose.model<IVerificationCode>(
  "VerificationCode",
  VerificationCodeSchema,
  "verification_codes"
);
