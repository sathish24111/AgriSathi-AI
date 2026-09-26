export interface ICropScan {
  id: string;
  userId: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
  severity: string;
  explanation: string;
  advisory: {
    summary: string;
    symptoms: string[];
    organicControl: string[];
    recommendedPractice: string[];
    safetyDisclaimer: string;
  };
  imageUrl?: string;
  createdAt: Date;
}

