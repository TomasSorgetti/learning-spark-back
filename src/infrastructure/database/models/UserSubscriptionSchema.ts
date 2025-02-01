import mongoose from "mongoose";

interface IUserSubscription extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  subscriptionId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

const UserSubscriptionSchema = new mongoose.Schema<IUserSubscription>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
});

export const UserSubscription = mongoose.model<IUserSubscription>(
  "UserSubscription",
  UserSubscriptionSchema
);
