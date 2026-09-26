import { IMarketPrice } from '../models/marketPrice.model';

export const marketService = {
  getDailyMandiPrices: async (district?: string): Promise<IMarketPrice[]> => {
    return [
      { id: '1', cropName: 'Tomato (टमाटर)', mandiName: 'Lasalgaon APMC', district: district || 'Nashik', minPrice: 1800, maxPrice: 2600, modalPrice: 2200, priceTrend: 'UP', date: 'Today' },
      { id: '2', cropName: 'Onion (कांदा)', mandiName: 'Pimpalgaon APMC', district: district || 'Nashik', minPrice: 1400, maxPrice: 1950, modalPrice: 1750, priceTrend: 'STABLE', date: 'Today' },
      { id: '3', cropName: 'Cotton (कापूस)', mandiName: 'Jalgaon APMC', district: district || 'Jalgaon', minPrice: 6800, maxPrice: 7400, modalPrice: 7100, priceTrend: 'UP', date: 'Today' },
      { id: '4', cropName: 'Soybean (सोयाबीन)', mandiName: 'Latur APMC', district: district || 'Latur', minPrice: 4200, maxPrice: 4850, modalPrice: 4600, priceTrend: 'DOWN', date: 'Today' },
    ];
  },
};

