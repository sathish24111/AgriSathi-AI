import React from 'react';
import { WeatherCard } from '../components/dashboard/WeatherCard';
import { MarketTrendsCard } from '../components/dashboard/MarketTrendsCard';
import { CropScannerWidget } from '../components/dashboard/CropScannerWidget';
import { Sparkles, Calendar, BellRing } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-emerald-800 text-white rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Farm Intelligence Active</span>
          </div>
          <h2 className="text-2xl font-bold">Namaste, {user?.name || 'Farmer Friend'} 🙏</h2>
          <p className="text-sm text-emerald-100 mt-1">
            Monitoring your {user?.totalLandAcres || 3.5} acres in {user?.location || 'Nashik'}. All systems and AI advisors are ready.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <WeatherCard />
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-800">Upcoming Stage Reminders</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-800">Tomato: Flowering Stage</span>
                <p className="text-slate-500 mt-0.5">Apply boron micronutrient spray within 3 days.</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-800">Onion: Bulb Development</span>
                <p className="text-slate-500 mt-0.5">Maintain light irrigation schedule.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <CropScannerWidget />
          <MarketTrendsCard />
        </div>
      </div>
    </div>
  );
};

