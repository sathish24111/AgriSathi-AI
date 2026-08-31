import React from 'react';
import { WeatherData } from '../types';
import { CloudSun, Droplets, Wind, MapPin, AlertCircle, RefreshCw } from 'lucide-react';

interface WeatherWidgetProps {
  weather: WeatherData | null;
  loading: boolean;
  onDetectLocation: () => void;
  onSelectDistrict: (district: string) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  weather,
  loading,
  onDetectLocation,
  onSelectDistrict
}) => {
  const districts = ['Nashik', 'Pune', 'Coimbatore', 'Chennai', 'Nagpur', 'Kolhapur'];

  return (
    <div className="bg-gradient-to-br from-green-800 to-agri-primary text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
      
      {/* Background Subtle Leaf Deco */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
        <CloudSun className="w-48 h-48" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        
        {/* Left: Location & Temp */}
        <div>
          <div className="flex items-center space-x-2 text-green-200 text-sm font-medium mb-1">
            <MapPin className="h-4 w-4" />
            <span>{weather?.locationName || 'Detecting Location...'}</span>
            <button
              onClick={onDetectLocation}
              className="ml-2 underline text-xs text-green-100 hover:text-white flex items-center space-x-1"
              title="Detect GPS Location"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Auto-Detect</span>
            </button>
          </div>

          <div className="flex items-baseline space-x-3 mt-2">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {weather ? `${weather.tempC}°C` : '--'}
            </span>
            <span className="text-lg font-medium text-green-100">
              {weather?.condition || 'Loading weather...'}
            </span>
          </div>

          {/* District selector fallback */}
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span className="text-green-200">Manual Location:</span>
            <select
              value={weather?.locationName.split(',')[0] || 'Nashik'}
              onChange={(e) => onSelectDistrict(e.target.value)}
              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white focus:outline-none cursor-pointer"
            >
              {districts.map(d => (
                <option key={d} value={d} className="text-gray-900">{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Weather Metrics & Provider status */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-300 shrink-0" />
            <div>
              <span className="text-xs text-green-200 block">Humidity</span>
              <span className="text-sm font-bold">{weather ? `${weather.humidity}%` : '--'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-green-300 shrink-0" />
            <div>
              <span className="text-xs text-green-200 block">Wind</span>
              <span className="text-sm font-bold">{weather ? `${weather.windKmH} km/h` : '--'}</span>
            </div>
          </div>

          <div className="col-span-2 pt-2 border-t border-white/10 flex items-start space-x-2 text-xs">
            <AlertCircle className="h-4 w-4 text-agri-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-green-100 block">Crop Risk Advisory:</span>
              <span className="text-green-200">{weather?.cropAdvisory || 'Fetching advisory...'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Mode Tag (Fulfills Requirement 4: Live API vs Mock separation tag) */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-green-200">
        <span>Feed Provider: {weather?.provider || 'AgriSathi Weather Engine'}</span>
        <span className={`px-2 py-0.5 rounded font-bold ${weather?.isLiveAPI ? 'bg-green-500 text-white' : 'bg-yellow-500/30 text-yellow-200'}`}>
          {weather?.isLiveAPI ? 'LIVE API METEOROLOGICAL FEED' : 'SIMULATED DEMO WEATHER FEED'}
        </span>
      </div>

    </div>
  );
};
