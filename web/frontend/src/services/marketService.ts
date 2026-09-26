import api from './api';
import { MarketPrice } from '../types';

export const marketService = {
  getMarketRates: async (district?: string): Promise<MarketPrice[]> => {
    const res = await api.get('/market/rates', { params: { district } });
    return res.data;
  },
};

