import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  subtopicId: mongoose.Types.ObjectId;
  purchaseDate: Date;
}

const PurchaseSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTopic",
      required: true,
      index: true,
    },
    purchaseDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const PurchaseModel = mongoose.model<IPurchase>(
  "Purchase",
  PurchaseSchema
);
