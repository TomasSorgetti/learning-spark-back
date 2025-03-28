import mongoose, { Schema, Document } from "mongoose";

export interface ISubTopic extends Document {
  name: string;
  topicId: mongoose.Types.ObjectId;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubTopicSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const SubTopicModel = mongoose.model<ISubTopic>(
  "SubTopic",
  SubTopicSchema
);
