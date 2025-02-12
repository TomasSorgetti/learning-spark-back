import mongoose, { Schema, Document } from "mongoose";

export type SectionType =
  | "QuestionsByTopic"
  | "MockExams"
  | "Summaries"
  | "PastPapers";

export interface ITopic extends Document {
  name: string;
  subsubjectId: mongoose.Types.ObjectId;
  sectionType: SectionType;
  purchaseRequired: boolean;
}

const TopicSchema: Schema = new Schema({
  name: { type: String, required: true },
  subsubjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubject",
    required: true,
  },
  sectionType: {
    type: String,
    enum: ["QuestionsByTopic", "MockExams", "Summaries", "PastPapers"],
    required: true,
  },
  purchaseRequired: { type: Boolean, default: false },
});

export const TopicModel = mongoose.model<ITopic>("Topic", TopicSchema);
