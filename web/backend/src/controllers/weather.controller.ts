import { Request, Response } from 'express';
import { weatherService } from '../services/weather.service';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
    const lon = req.query.lon ? parseFloat(req.query.lon as string) : undefined;
    const weather = await weatherService.getWeatherData(lat, lon);
    return sendSuccess(res, weather, 'Weather info fetched');
  } catch (error) {
    return sendError(res, 'Failed to fetch weather data', 500, error);
  }
};

