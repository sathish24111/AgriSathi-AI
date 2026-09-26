export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
export type TrendDirection = 'UP' | 'DOWN' | 'STABLE';
export type AlertCategory = 'DISEASE' | 'PEST' | 'WEATHER' | 'STAGE_REMINDER' | 'ADVISORY';

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  preferredLanguage: string;
  totalLandAcres: number;
}

export interface DiseaseResult {
  scanId: string;
  imageUrl?: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  riskLevel: RiskLevel;
  severity: string;
  explanation: string;
  advisory: {
    summary: string;
    symptoms: string[];
    organicControl: string[];
    recommendedPractice: string[];
    safetyDisclaimer: string;
  };
  timestamp: string;
}

export interface MarketPrice {
  id: string;
  cropName: string;
  mandiName: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceTrend: TrendDirection;
  date: string;
}

export interface WeatherInfo {
  locationName: string;
  tempC: number;
  condition: string;
  humidity: number;
  rainfallRisk: string;
  cropAdvisory: string;
}

export interface CropPlanStage {
  stageName: string;
  durationDays: string;
  keyActions: string[];
  riskLevel: RiskLevel;
}

export interface CropPlan {
  cropName: string;
  acres: number;
  sowingDate: string;
  district: string;
  stages: CropPlanStage[];
  financial: {
    estimatedCost: number;
    expectedYieldMin: number;
    expectedYieldMax: number;
    yieldUnit: string;
    expectedRevenue: number;
    estimatedProfitMin: number;
    estimatedProfitMax: number;
  };
  weatherAdvisory: string;
}

