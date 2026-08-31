import mongoose, { Schema, Document } from 'mongoose';

export interface IScan extends Document {
  scanId: string;
  userId: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  confidenceMessage: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  severity: string;
  explanation: String;
  symptoms: string[];
  organicControl: string[];
  recommendedPractice: string[];
  imageUrl: string;
  location: string;
  timestamp: number;
}

const ScanSchema: Schema = new Schema({
  scanId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  cropName: { type: String, required: true },
  diseaseName: { type: String, required: true },
  confidence: { type: Number, required: true },
  confidenceMessage: { type: String, required: true },
  riskLevel: { type: String, enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'], default: 'MODERATE' },
  severity: { type: String, default: 'Moderate' },
  explanation: { type: String, required: true },
  symptoms: [{ type: String }],
  organicControl: [{ type: String }],
  recommendedPractice: [{ type: String }],
  imageUrl: { type: String, required: true },
  location: { type: String, default: 'Nashik, Maharashtra' },
  timestamp: { type: Number, default: Date.now }
});

export default mongoose.model<IScan>('Scan', ScanSchema);
