import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  url: string;
  image: string;
  views: number;
  subjectId: string;

  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String], required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    views: { type: Number, default: 0 },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model<IPost>("Post", PostSchema);
