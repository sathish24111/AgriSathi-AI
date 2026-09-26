import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

export const CropPlanner: React.FC = () => {
  const [crop, setCrop] = useState('Tomato');
  const [acres, setAcres] = useState(2.0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Smart Crop Lifecycle & Financial Planner</h2>
        <p className="text-sm text-slate-500">Calculate harvest timelines, input costs, and projected profits</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Crop</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
            >
              <option value="Tomato">Tomato (टमाटर)</option>
              <option value="Onion">Onion (कांदा)</option>
              <option value="Cotton">Cotton (कापूस)</option>
              <option value="Soybean">Soybean (सोयाबीन)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Land Size (Acres)</label>
            <input
              type="number"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-800 font-semibold">Estimated Net Profit (Projected)</p>
            <p className="text-xl font-bold text-emerald-900">{formatCurrency(acres * 125000)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-800 font-semibold">Estimated Total Cost</p>
            <p className="text-base font-bold text-slate-700">{formatCurrency(acres * 45000)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

