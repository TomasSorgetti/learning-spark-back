import mongoose, { Schema, Document } from "mongoose";

export interface ISubSubject extends Document {
  name: string;
  description: string;
  subjectId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SubSubjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
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

export const SubSubjectModel = mongoose.model<ISubSubject>(
  "SubSubject",
  SubSubjectSchema
);
