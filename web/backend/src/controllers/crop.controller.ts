import { Request, Response } from 'express';
import { aiDetectionService } from '../services/aiDetection.service';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const scanCrop = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const cropHint = req.body.cropName;
    const diagnosis = await aiDetectionService.diagnoseLeafImage(file ? file.buffer : Buffer.from([]), cropHint);
    
    return sendSuccess(res, {
      scanId: `scan_${Date.now()}`,
      ...diagnosis,
      timestamp: new Date().toISOString(),
    }, 'Crop diagnosis complete');
  } catch (error) {
    return sendError(res, 'Diagnosis failed', 500, error);
  }
};

export const getScanHistory = async (req: Request, res: Response) => {
  return sendSuccess(res, [
    {
      scanId: 'scan_101',
      cropName: 'Tomato',
      diseaseName: 'Early Blight',
      confidence: 94,
      riskLevel: 'HIGH',
      timestamp: new Date().toISOString(),
    }
  ], 'Scan history fetched');
};

export const createCropPlan = async (req: Request, res: Response) => {
  const { cropName, acres } = req.body;
  const land = acres || 2.0;

  return sendSuccess(res, {
    cropName: cropName || 'Tomato',
    acres: land,
    sowingDate: '15 Oct 2026',
    district: 'Nashik',
    stages: [
      { stageName: 'Nursery & Land Prep', durationDays: '25 Days', keyActions: ['Soil solarization', 'FYM application'], riskLevel: 'LOW' },
      { stageName: 'Vegetative Growth', durationDays: '30 Days', keyActions: ['Staking', 'Fertigation 19:19:19'], riskLevel: 'MODERATE' },
      { stageName: 'Flowering & Fruiting', durationDays: '45 Days', keyActions: ['Boron spray', 'Fruit borer monitoring'], riskLevel: 'HIGH' },
    ],
    financial: {
      estimatedCost: land * 45000,
      expectedYieldMin: land * 180,
      expectedYieldMax: land * 240,
      yieldUnit: 'Quintals',
      expectedRevenue: land * 170000,
      estimatedProfitMin: land * 110000,
      estimatedProfitMax: land * 140000,
    },
    weatherAdvisory: 'Optimal temperature and humidity index expected across Maharashtra during initial sowing window.',
  }, 'Crop plan generated');
};

