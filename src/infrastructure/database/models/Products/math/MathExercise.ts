import mongoose, { Schema } from "mongoose";

const Levels = ["Easy", "Medium", "Hard"];

export interface IMathExercise extends Document {
  subTopicId: mongoose.Types.ObjectId;
  question: string;
  level: (typeof Levels)[number];
  options?: string[];
  correctAnswer?: string;
  solution: string;
  isFree: boolean;
}

const MathExerciseSchema: Schema = new Schema({
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubTopic",
    required: true,
  },
  question: { type: String, required: true },
  level: {
    type: String,
    enum: Levels,
    required: true,
  },
  options: { type: [String], default: [] },
  correctAnswer: { type: String },
  solution: { type: String, required: true },
  isFree: { type: Boolean, default: false },
});

export const MathExerciseModel = mongoose.model<IMathExercise>(
  "MathExercise",
  MathExerciseSchema
);
