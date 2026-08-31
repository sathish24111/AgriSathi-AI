import mongoose, { Schema, Document } from 'mongoose';

export interface ICrop extends Document {
  userId: string;
  name: string;
  variety: string;
  plantingDate: string;
  growthStage: string;
  farmLocation: string;
  farmSizeAcres: number;
  soilType: string;
  irrigationType: string;
  healthStatus: 'HEALTHY' | 'MODERATE_RISK' | 'HIGH_RISK';
  createdAt: Date;
}

const CropSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  variety: { type: String, default: 'Hybrid Standard' },
  plantingDate: { type: String, required: true },
  growthStage: { type: String, default: 'Vegetative Growth' },
  farmLocation: { type: String, default: 'Nashik, Maharashtra' },
  farmSizeAcres: { type: Number, default: 2.5 },
  soilType: { type: String, default: 'Black Sandy Loam' },
  irrigationType: { type: String, default: 'Drip Irrigation' },
  healthStatus: { type: String, enum: ['HEALTHY', 'MODERATE_RISK', 'HIGH_RISK'], default: 'HEALTHY' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICrop>('Crop', CropSchema);
