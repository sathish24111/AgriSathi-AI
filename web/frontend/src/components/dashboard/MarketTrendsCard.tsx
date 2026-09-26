import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { MarketPrice } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface MarketTrendsCardProps {
  prices?: MarketPrice[];
}

export const MarketTrendsCard: React.FC<MarketTrendsCardProps> = ({ prices }) => {
  const samplePrices: MarketPrice[] = prices || [
    { id: '1', cropName: 'Tomato (टमाटर)', mandiName: 'Lasalgaon APMC', district: 'Nashik', minPrice: 1800, maxPrice: 2600, modalPrice: 2200, priceTrend: 'UP', date: 'Today' },
    { id: '2', cropName: 'Onion (कांदा)', mandiName: 'Pimpalgaon APMC', district: 'Nashik', minPrice: 1400, maxPrice: 1950, modalPrice: 1750, priceTrend: 'STABLE', date: 'Today' },
    { id: '3', cropName: 'Cotton (कापूस)', mandiName: 'Jalgaon APMC', district: 'Jalgaon', minPrice: 6800, maxPrice: 7400, modalPrice: 7100, priceTrend: 'UP', date: 'Today' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Mandi Market Rates</h3>
            <p className="text-xs text-slate-500">Live APMC Price Intelligence</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {samplePrices.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="font-semibold text-slate-800 text-sm">{item.cropName}</p>
              <p className="text-xs text-slate-500">{item.mandiName}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1">
                <span className="font-bold text-slate-800 text-sm">{formatCurrency(item.modalPrice)}</span>
                <span className="text-[10px] text-slate-500">/ Qtl</span>
                {item.priceTrend === 'UP' && <ArrowUpRight className="w-4 h-4 text-emerald-600" />}
                {item.priceTrend === 'DOWN' && <ArrowDownRight className="w-4 h-4 text-rose-600" />}
                {item.priceTrend === 'STABLE' && <Minus className="w-4 h-4 text-amber-500" />}
              </div>
              <p className="text-[11px] text-slate-400">Range: {formatCurrency(item.minPrice)} - {formatCurrency(item.maxPrice)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

