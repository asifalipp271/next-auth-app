import mongoose, { Schema, Document, models } from 'mongoose';

export type UserRole = 'doctor' | 'patient';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['doctor', 'patient'],
      default: 'patient',
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model<IUser>('User', UserSchema);
