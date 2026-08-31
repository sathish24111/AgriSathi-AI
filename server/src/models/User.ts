import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  passwordHash: string;
  role: 'FARMER' | 'ADMIN';
  state: string;
  district: string;
  preferredLanguage: string;
  primaryCrop: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['FARMER', 'ADMIN'], default: 'FARMER' },
  state: { type: String, default: 'Maharashtra' },
  district: { type: String, default: 'Nashik' },
  preferredLanguage: { type: String, default: 'en' },
  primaryCrop: { type: String, default: 'Tomato' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
