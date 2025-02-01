import mongoose from "mongoose";

interface ISubscription extends mongoose.Document {
  name: string;
  subjectId: mongoose.Types.ObjectId;
  price: number;
  durationInDays: number;
  isFree: boolean;
}

const SubscriptionSchema = new mongoose.Schema<ISubscription>({
  name: { type: String, required: true },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  price: { type: Number, default: 0 },
  durationInDays: { type: Number, required: true }, // Ej: 30 days
  isFree: { type: Boolean, default: false },
});

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
