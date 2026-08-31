import React, { useState } from 'react';
import { Calculator, Sprout, Calendar, DollarSign, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const CropPlannerPage: React.FC = () => {
  const [cropName, setCropName] = useState('Tomato');
  const [acres, setAcres] = useState(2.0);
  const [sowingDate, setSowingDate] = useState('2026-10-15');
  const [district, setDistrict] = useState('Nashik');

  const estimatedCost = 35000 * acres;
  const yieldMin = 180 * acres;
  const yieldMax = 240 * acres;
  const avgPricePerQuintal = 2500;
  const expectedRevenue = ((yieldMin + yieldMax) / 2) * avgPricePerQuintal;
  const profitMin = yieldMin * avgPricePerQuintal - estimatedCost;
  const profitMax = yieldMax * avgPricePerQuintal - estimatedCost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-3">
        <div className="p-3 bg-green-100 text-agri-primary rounded-xl">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Crop Planner & Profit Estimator</h1>
          <p className="text-sm text-gray-500">Calculate cultivation costs, expected yield, net profit, and stage timeline</p>
        </div>
      </div>

      {/* Input Form & Financial Estimates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Input Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base">Select Crop & Land</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Crop</label>
              <select
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold"
              >
                <option value="Tomato">Tomato</option>
                <option value="Cotton">Cotton</option>
                <option value="Paddy">Paddy / Rice</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Onion">Onion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Farm Land (Acres)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={acres}
                onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sowing Date</label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">District Location</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Financial Estimates Breakdown */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base">Financial & Yield Estimates ({acres} Acres {cropName})</h3>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="p-4 bg-agri-surface rounded-xl border border-green-100">
              <span className="text-xs text-gray-500 block">Estimated Cultivation Cost</span>
              <span className="text-xl font-bold text-gray-900">₹{estimatedCost.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-agri-surface rounded-xl border border-green-100">
              <span className="text-xs text-gray-500 block">Expected Yield</span>
              <span className="text-xl font-bold text-agri-primary">{yieldMin} - {yieldMax} Quintals</span>
            </div>

            <div className="p-4 bg-agri-surface rounded-xl border border-green-100">
              <span className="text-xs text-gray-500 block">Expected Gross Revenue</span>
              <span className="text-xl font-bold text-gray-900">₹{expectedRevenue.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-green-100 rounded-xl border border-green-300">
              <span className="text-xs text-agri-primary font-bold block">Net Profit Range</span>
              <span className="text-xl font-extrabold text-agri-primary">
                ₹{profitMin.toLocaleString()} - ₹{profitMax.toLocaleString()}
              </span>
            </div>

          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-2">
            <ShieldAlert className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
            <span>
              Disclaimer: Figures are agronomic estimates based on historical market prices and standard crop yields in {district}. Income is not guaranteed.
            </span>
          </div>
        </div>

      </div>

      {/* 4 Cultivation Stages & Risk Windows */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-base">Cultivation Stages & Action Planning</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">1. Sowing & Nursery (Days 1 - 25)</span>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Low Risk</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Prepare bed with organic farmyard manure (FYM)</li>
              <li>• Drench root zone with Trichoderma biocontrol solution</li>
              <li>• Maintain soil moisture without waterlogging</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">2. Vegetative Growth (Days 26 - 50)</span>
              <span className="text-xs font-bold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded">Moderate Risk</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Apply first split dosage of organic NPK fertilizer</li>
              <li>• Inspect leaves every 3 days for Early Blight & Whitefly</li>
              <li>• Install sticky yellow card traps across crop rows</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">3. Flowering & Fruiting (Days 51 - 85)</span>
              <span className="text-xs font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded">High Risk</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Critical irrigation window - prevent soil moisture stress</li>
              <li>• Spray micronutrient borax solution to prevent fruit splitting</li>
              <li>• Erect bamboo stakes to support heavy vine load</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">4. Harvesting & Grading (Days 86 - 120)</span>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Low Risk</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Harvest early morning at breaker red stage for distant mandis</li>
              <li>• Grade fruit size in shade before packing into crates</li>
              <li>• Transport directly to nearest APMC market</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
