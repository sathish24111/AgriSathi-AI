import { Request, Response } from 'express';
import { marketService } from '../services/market.service';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getMarketRates = async (req: Request, res: Response) => {
  try {
    const district = req.query.district as string;
    const rates = await marketService.getDailyMandiPrices(district);
    return sendSuccess(res, rates, 'Market rates fetched');
  } catch (error) {
    return sendError(res, 'Failed to retrieve market rates', 500, error);
  }
};

