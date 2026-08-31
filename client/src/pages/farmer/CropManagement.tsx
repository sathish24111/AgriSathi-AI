import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Plus, AlertTriangle, CloudRain, ChevronRight } from 'lucide-react';

export const CropManagement: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Disease' | 'Weather'>('All');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Farm Overview</span>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Monitor your active crops and critical environmental alerts.</h1>
        </div>

        <button className="bg-[#15803d] text-white font-bold px-5 py-2.5 rounded-xl shadow hover:bg-[#166534] transition flex items-center space-x-2 shrink-0">
          <Plus className="h-4 w-4" />
          <span>Add Crop</span>
        </button>
      </div>

      {/* Main 2-Column Section (My Active Crops vs Alerts Center) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: My Active Crops */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-extrabold text-xl text-gray-900">My Active Crops</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tomato Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-[#15803d] flex items-center justify-center font-bold">
                    🍅
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900">Tomato</h3>
                    <span className="text-xs text-gray-500 font-medium">Roma Variety</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  ⚠️ Moderate Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div>
                  <span className="text-gray-400 block">Planting Date</span>
                  <span className="font-bold text-gray-800">12 Oct 2023</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Growth Stage</span>
                  <span className="font-bold text-gray-800">Flowering</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Link to="/crops/crop_1" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-lg text-center">
                  Details
                </Link>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-lg text-center">
                  Log Data
                </button>
              </div>
            </div>

            {/* Paddy Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-[#15803d] flex items-center justify-center font-bold">
                    🌾
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900">Paddy</h3>
                    <span className="text-xs text-gray-500 font-medium">Basmati 370</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">
                  ✔ Healthy
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div>
                  <span className="text-gray-400 block">Planting Date</span>
                  <span className="font-bold text-gray-800">05 Sep 2023</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Growth Stage</span>
                  <span className="font-bold text-gray-800">Tillering</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Link to="/crops/crop_2" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-lg text-center">
                  Details
                </Link>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-lg text-center">
                  Log Data
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right 1 Col: Alerts Center */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-xl text-gray-900">Alerts Center</h2>
            
            {/* Filter Pills */}
            <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold space-x-1">
              {(['All', 'Disease', 'Weather'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 rounded-lg transition ${
                    filter === t ? 'bg-[#15803d] text-white shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {/* Alert Card 1: Tomato Early Blight */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-red-700 font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Tomato Early Blight</span>
              </div>
              <p className="text-red-900 leading-relaxed">
                High humidity (85%) and recent rain increase risk significantly.
              </p>
              <div className="pt-1 text-red-900">
                <strong className="block text-red-700">Recommended Action:</strong>
                <span>Apply preventative copper-based fungicide within 24 hours.</span>
              </div>
              <Link to="/scanner/result/scan_1788001" className="inline-block text-red-700 font-bold hover:underline pt-1">
                View Treatment Plan ➔
              </Link>
            </div>

            {/* Alert Card 2: Heavy Rain Expected */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-800 font-bold">
                <CloudRain className="h-4 w-4 shrink-0 text-amber-600" />
                <span>Heavy Rain Expected</span>
              </div>
              <p className="text-amber-900 leading-relaxed">
                Moderate risk of waterlogging in Paddy fields.
              </p>
              <Link to="/alerts" className="inline-block text-amber-800 font-bold hover:underline pt-1">
                Check Drainage Guidelines ➔
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
