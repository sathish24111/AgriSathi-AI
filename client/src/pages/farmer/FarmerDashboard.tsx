import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { apiClient } from '../../api/client';
import { autoDetectLocation } from '../../utils/geolocation';
import { WeatherData, DiseaseScanResult, RiskAlert, Crop } from '../../types';
import { RiskBadge } from '../../components/RiskBadge';
import { Camera, MapPin, Sun, CloudRain, AlertTriangle, ChevronRight, Activity, Bell } from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user, updateUserLocation } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [scans, setScans] = useState<DiseaseScanResult[]>([]);
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    autoDetectLocation().then(geo => {
      updateUserLocation(geo.district, geo.state);
      apiClient.getWeather(geo.lat, geo.lng, geo.district).then(setWeather).catch(console.error);
    });

    apiClient.getScanHistory().then(setScans).catch(console.error);
    apiClient.getAlerts().then(setAlerts).catch(console.error);
    apiClient.getCrops().then(setCrops).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Greeting Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-green-100 border-2 border-[#15803d] overflow-hidden flex items-center justify-center text-2xl">
            👨‍🌾
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Good Morning, {user?.name || 'Farmer'} 👋
            </h1>
            <p className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#15803d]" />
              <span>{user?.district || 'Coimbatore'}, {user?.state || 'Tamil Nadu'}</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-xs">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
          <Link to="/register" className="bg-[#15803d] text-white px-4 py-2 rounded-xl font-bold">Get Started</Link>
        </div>
      </div>

      {/* Main Top 2-Column Grid (Scan Card vs Weather Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Scan Your Crop Big CTA Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-gray-900">Scan Your Crop</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
              Take a clear photo of the affected leaf or plant to get instant AI analysis and treatment recommendations.
            </p>
          </div>

          <div className="my-6 p-8 rounded-2xl border-2 border-dashed border-gray-300 bg-[#f8faf9] text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-green-100 text-[#15803d] flex items-center justify-center">
              <Camera className="h-8 w-8" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Upload Image or Capture Live Photo</span>
          </div>

          <button
            onClick={() => navigate('/scanner')}
            className="w-full sm:w-auto self-start bg-[#15803d] hover:bg-[#166534] text-white font-bold px-8 py-3.5 rounded-xl shadow transition flex items-center justify-center space-x-2 text-sm"
          >
            <Camera className="h-5 w-5" />
            <span>Use Camera</span>
          </button>
        </div>

        {/* Right 1 Col: Weather & 5-Day Forecast Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-base">Weather</h3>
            <Sun className="h-5 w-5 text-amber-500" />
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-gray-900">28°</span>
            <span className="text-sm font-semibold text-gray-600">Mostly Cloudy</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1 border-t border-gray-100">
            <div>Humidity: <strong>85%</strong></div>
            <div>Rain: <strong>60%</strong></div>
          </div>

          {/* 5-Day Forecast */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">5-Day Forecast</span>
            
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-600">Tue</span>
              <Sun className="h-4 w-4 text-amber-500" />
              <span className="font-bold text-gray-800">24° / 29°</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-600">Wed</span>
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="font-bold text-gray-800">25° / 30°</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-600">Thu</span>
              <Sun className="h-4 w-4 text-amber-500" />
              <span className="font-bold text-gray-800">26° / 32°</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Bottom 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Crop Overview & Recent Scans */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Crop Overview Cards */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Crop Overview</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-gray-900">Tomato</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">High Risk</span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <div>Stage: <strong className="text-gray-800">Fruit Dev</strong></div>
                  <div>Health: <strong className="text-red-700">At Risk</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-gray-900">Paddy</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">Healthy</span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <div>Stage: <strong className="text-gray-800">Tillering</strong></div>
                  <div>Health: <strong className="text-green-700">Good</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-gray-900">Cotton</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">Healthy</span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <div>Stage: <strong className="text-gray-800">Vegetative</strong></div>
                  <div>Health: <strong className="text-green-700">Good</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans Table */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-base">Recent Scans</h3>
              <Link to="/history" className="text-xs font-bold text-[#15803d] hover:underline">View All</Link>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase font-bold border-b">
                  <th className="p-3">Crop</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">Tomato</td>
                  <td className="p-3 text-red-700 font-bold">Early Blight</td>
                  <td className="p-3 font-bold">94%</td>
                  <td className="p-3 text-gray-500">Today, 08:30 AM</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">Paddy</td>
                  <td className="p-3 text-green-700 font-bold">Healthy</td>
                  <td className="p-3 font-bold">98%</td>
                  <td className="p-3 text-gray-500">Yesterday</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Right 1 Col: Tomato Risk Card & System Alerts */}
        <div className="space-y-6">
          
          <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <h4 className="font-extrabold text-sm uppercase tracking-wider">Tomato Disease Risk: HIGH</h4>
            </div>

            <p className="text-xs text-red-900 leading-relaxed">
              High humidity (85%) and recent rainfall increase the risk of Late Blight. Recommended to apply preventive fungicide within 48 hours.
            </p>

            <Link
              to="/alerts"
              className="inline-block bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow hover:bg-red-700 transition"
            >
              View Details
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
              <Bell className="h-5 w-5 text-[#15803d]" />
              <span>System Alerts</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-900 block">Heavy rain expected tonight</span>
                <span className="text-[10px] text-gray-400">2 hrs ago</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-900 block">Paddy crop scan complete</span>
                <span className="text-[10px] text-gray-400">Yesterday</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
