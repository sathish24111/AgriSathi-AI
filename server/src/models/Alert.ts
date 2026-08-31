import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  id: string;
  title: string;
  category: 'DISEASE' | 'PEST' | 'WEATHER' | 'STAGE_REMINDER' | 'ADVISORY';
  description: string;
  date: string;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  region: string;
}

const AlertSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['DISEASE', 'PEST', 'WEATHER', 'STAGE_REMINDER', 'ADVISORY'], required: true },
  description: { type: String, required: true },
  date: { type: String, default: 'Today' },
  severity: { type: String, enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'], default: 'MODERATE' },
  region: { type: String, default: 'Maharashtra & Pan-India' }
});

export default mongoose.model<IAlert>('Alert', AlertSchema);
