import axios from 'axios';
import { User, Crop, DiseaseScanResult, WeatherData, RiskAlert, AdminAnalytics } from '../types';

const API_BASE = '/api';

export const apiClient = {
  // Auth
  register: async (userData: any) => {
    const res = await axios.post(`${API_BASE}/auth/register`, userData);
    return res.data;
  },
  login: async (credentials: { emailOrPhone: string; password: string }) => {
    const res = await axios.post(`${API_BASE}/auth/login`, credentials);
    return res.data;
  },
  getCurrentUser: async () => {
    const res = await axios.get(`${API_BASE}/auth/me`);
    return res.data;
  },

  // Crops
  getCrops: async (): Promise<Crop[]> => {
    const res = await axios.get(`${API_BASE}/crops`);
    return res.data;
  },
  createCrop: async (cropData: Partial<Crop>): Promise<Crop> => {
    const res = await axios.post(`${API_BASE}/crops`, cropData);
    return res.data;
  },
  getCropById: async (id: string): Promise<Crop> => {
    const res = await axios.get(`${API_BASE}/crops/${id}`);
    return res.data;
  },
  deleteCrop: async (id: string): Promise<{ success: boolean }> => {
    const res = await axios.delete(`${API_BASE}/crops/${id}`);
    return res.data;
  },

  // Scans
  uploadAndScan: async (formData: FormData): Promise<DiseaseScanResult> => {
    const res = await axios.post(`${API_BASE}/scans`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  getScanHistory: async (): Promise<DiseaseScanResult[]> => {
    const res = await axios.get(`${API_BASE}/scans`);
    return res.data;
  },
  getScanById: async (id: string): Promise<DiseaseScanResult> => {
    const res = await axios.get(`${API_BASE}/scans/${id}`);
    return res.data;
  },

  // Weather (Backend proxy fulfilling Requirement 3 & 4)
  getWeather: async (lat?: number, lng?: number, district?: string): Promise<WeatherData> => {
    const params: any = {};
    if (lat) params.lat = lat;
    if (lng) params.lng = lng;
    if (district) params.district = district;
    const res = await axios.get(`${API_BASE}/weather`, { params });
    return res.data;
  },

  // Alerts
  getAlerts: async (): Promise<RiskAlert[]> => {
    const res = await axios.get(`${API_BASE}/alerts`);
    return res.data;
  },

  // Assistant Chat
  askAssistant: async (data: { query: string; crop?: string; stage?: string; location?: string; weather?: any }) => {
    const res = await axios.post(`${API_BASE}/assistant/chat`, data);
    return res.data;
  },

  // Admin
  getAdminAnalytics: async (): Promise<AdminAnalytics> => {
    const res = await axios.get(`${API_BASE}/admin/analytics`);
    return res.data;
  }
};
