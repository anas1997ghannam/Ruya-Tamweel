//path:models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  bio?: string;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "active",
  },
}, { timestamps: true });

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);