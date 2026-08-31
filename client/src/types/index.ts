export type UserRole = 'FARMER' | 'ADMIN';

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  state: string;
  district: string;
  preferredLanguage: string;
  primaryCrop: string;
  createdAt?: string;
}

export interface Crop {
  _id: string;
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
  createdAt?: string;
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface DiseaseScanResult {
  scanId: string;
  userId?: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  confidenceMessage: string;
  riskLevel: RiskLevel;
  severity: string;
  explanation: string;
  symptoms: string[];
  organicControl: string[];
  recommendedPractice: string[];
  imageUrl: string;
  location: string;
  timestamp: number;
}

export interface WeatherData {
  locationName: string;
  lat: number;
  lng: number;
  tempC: number;
  condition: string;
  humidity: number;
  rainfallRisk: string;
  windKmH: number;
  cropAdvisory: string;
  isLiveAPI: boolean;
  provider: string;
}

export interface RiskAlert {
  id: string;
  title: string;
  category: 'DISEASE' | 'PEST' | 'WEATHER' | 'STAGE_REMINDER' | 'ADVISORY';
  description: string;
  date: string;
  severity: RiskLevel;
  region: string;
}

export interface AdminAnalytics {
  metrics: {
    totalFarmers: number;
    totalScans: number;
    activeAlerts: number;
    diseasesDetected: number;
    mostAffectedCrop: string;
  };
  scanTrends: { month: string; scans: number }[];
  cropDistribution: { name: string; percentage: number }[];
  farmers: User[];
  crops: Crop[];
  scans: DiseaseScanResult[];
  alerts: RiskAlert[];
}
