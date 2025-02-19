import mongoose, { Schema, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  topicId: mongoose.Types.ObjectId;
  price: number;
  description: string;
}

const PlanSchema: Schema = new Schema({
  name: { type: String, required: true },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
    index: true,
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export const PlanModel = mongoose.model<IPlan>("Plan", PlanSchema);
