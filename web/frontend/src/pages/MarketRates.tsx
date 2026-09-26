import React from 'react';
import { MarketTrendsCard } from '../components/dashboard/MarketTrendsCard';

export const MarketRates: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">APMC Mandi Market Intelligence</h2>
        <p className="text-sm text-slate-500">Real-time daily wholesale prices and price trend analysis</p>
      </div>

      <MarketTrendsCard />
    </div>
  );
};

