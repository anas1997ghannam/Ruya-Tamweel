// path: models/Support.ts
import mongoose, { Schema, model, models } from "mongoose";

const supportSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  phone: { type: String }, // رقم الهاتف للتواصل
  location: { type: String }, // مكان اللقاء
  date: { type: String }, // تاريخ اللقاء
  time: { type: String }, // وقت اللقاء
  createdAt: { type: Date, default: Date.now },
});

export const Support = models.Support || model("Support", supportSchema);