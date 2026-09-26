export interface IMarketPrice {
  id: string;
  cropName: string;
  mandiName: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceTrend: 'UP' | 'DOWN' | 'STABLE';
  date: string;
}

