import mongoose from "mongoose";

interface IPurchase extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  purchaseDate: Date;
}

const PurchaseSchema = new mongoose.Schema<IPurchase>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
    index: true,
  },
  purchaseDate: { type: Date, required: true, default: Date.now },
});

export const PurchaseModel = mongoose.model<IPurchase>(
  "Purchase",
  PurchaseSchema
);
