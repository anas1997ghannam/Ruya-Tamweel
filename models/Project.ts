import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    budget: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    status: {
      type: String,
      enum: ["pending_review", "active", "disabled"],
      default: "pending_review",
    },
    criteriaAnswers: [
      {
        number: { type: Number, required: true }, // 1-10
        answer: { type: String, required: true },
      },
    ],
    evaluationScore: { type: Number, default: 0 },
    evaluationExplanations: [{ type: String }], 
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema);
