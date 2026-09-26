import React from 'react';
import { CloudSun, Droplets, Wind } from 'lucide-react';
import { WeatherInfo } from '../../types';

interface WeatherCardProps {
  weather?: WeatherInfo;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const data: WeatherInfo = weather || {
    locationName: 'Nashik, Maharashtra',
    tempC: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainfallRisk: 'Low (15%)',
    cropAdvisory: 'Favorable conditions for morning foliar spray and weeding activities.',
  };

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Live Weather</span>
          <h3 className="text-lg font-bold mt-0.5">{data.locationName}</h3>
          <p className="text-xs text-emerald-100">{data.condition}</p>
        </div>
        <CloudSun className="w-10 h-10 text-amber-300" />
      </div>

      <div className="mt-4 flex items-baseline space-x-2">
        <span className="text-4xl font-extrabold">{data.tempC}°</span>
        <span className="text-sm text-emerald-100">Celsius</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-emerald-500/40">
        <div className="flex items-center space-x-1.5">
          <Droplets className="w-4 h-4 text-emerald-200" />
          <span>Humidity: <strong>{data.humidity}%</strong></span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Wind className="w-4 h-4 text-emerald-200" />
          <span>Rain Risk: <strong>{data.rainfallRisk}</strong></span>
        </div>
      </div>

      <div className="mt-3 bg-white/10 rounded-xl p-2.5 text-xs text-emerald-50">
        💡 {data.cropAdvisory}
      </div>
    </div>
  );
};

