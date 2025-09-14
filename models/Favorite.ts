//path:models/Favorite.ts
import mongoose, { Schema, model, models } from "mongoose";

const favoriteSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  createdAt: { type: Date, default: Date.now }
});
export const Favorite = models.Favorite || model("Favorite", favoriteSchema);