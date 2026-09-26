import api from './api';
import { WeatherInfo } from '../types';

export const weatherService = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherInfo> => {
    const res = await api.get('/weather/current', { params: { lat, lon } });
    return res.data;
  },
};

