import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  subtopicId?: mongoose.Types.ObjectId;
  topicId?: mongoose.Types.ObjectId;
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
      required: false,
      index: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: false,
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
