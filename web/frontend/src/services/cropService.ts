import api from './api';
import { DiseaseResult, CropPlan } from '../types';

export const cropService = {
  scanCropImage: async (formData: FormData): Promise<DiseaseResult> => {
    const res = await api.post('/crop/scan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  getScanHistory: async (): Promise<DiseaseResult[]> => {
    const res = await api.get('/crop/history');
    return res.data;
  },

  generateCropPlan: async (planInput: {
    cropName: string;
    acres: number;
    sowingDate: string;
    district: string;
  }): Promise<CropPlan> => {
    const res = await api.post('/crop/plan', planInput);
    return res.data;
  },
};

