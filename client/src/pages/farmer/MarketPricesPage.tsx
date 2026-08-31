import React, { useState } from 'react';
import { Store, Search, TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';

interface MandiPrice {
  cropName: string;
  mandiName: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export const MarketPricesPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const mandiPrices: MandiPrice[] = [
    { cropName: 'Tomato', mandiName: 'Nashik APMC', district: 'Nashik', minPrice: 2200, maxPrice: 2800, modalPrice: 2550, trend: 'UP' },
    { cropName: 'Onion (Red)', mandiName: 'Lasalgaon APMC', district: 'Nashik', minPrice: 1800, maxPrice: 2400, modalPrice: 2150, trend: 'UP' },
    { cropName: 'Cotton', mandiName: 'Nagpur APMC', district: 'Nagpur', minPrice: 6800, maxPrice: 7500, modalPrice: 7200, trend: 'STABLE' },
    { cropName: 'Sugarcane', mandiName: 'Kolhapur APMC', district: 'Kolhapur', minPrice: 3100, maxPrice: 3500, modalPrice: 3300, trend: 'UP' },
    { cropName: 'Paddy / Rice', mandiName: 'Chennai APMC', district: 'Chennai', minPrice: 1950, maxPrice: 2300, modalPrice: 2100, trend: 'DOWN' },
    { cropName: 'Grape (Export)', mandiName: 'Pimpalgaon APMC', district: 'Nashik', minPrice: 8500, maxPrice: 11000, modalPrice: 9800, trend: 'UP' }
  ];

  const filtered = mandiPrices.filter(
    p => p.cropName.toLowerCase().includes(search.toLowerCase()) ||
         p.mandiName.toLowerCase().includes(search.toLowerCase()) ||
         p.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 text-agri-primary rounded-xl">
            <Store className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">APMC Market Commodity Rates</h1>
            <p className="text-sm text-gray-500">Live commodity prices and trends across agricultural mandis</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop or mandi..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-agri-primary"
          />
        </div>
      </div>

      {/* Mandi Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:border-agri-primary transition">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-lg text-agri-primary">{item.cropName}</h3>
                <p className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400 inline" />
                  <span>{item.mandiName} • {item.district}</span>
                </p>
              </div>

              {/* Trend Badge */}
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                item.trend === 'UP' ? 'bg-green-100 text-green-800' :
                item.trend === 'DOWN' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {item.trend === 'UP' && <TrendingUp className="h-4 w-4 text-green-700" />}
                {item.trend === 'DOWN' && <TrendingDown className="h-4 w-4 text-red-700" />}
                {item.trend === 'STABLE' && <Minus className="h-4 w-4 text-gray-600" />}
                <span>{item.trend}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
              <div>
                <span className="text-gray-400 block">Min - Max Rate:</span>
                <span className="font-semibold text-gray-800">₹{item.minPrice} - ₹{item.maxPrice}</span>
              </div>

              <div className="text-right">
                <span className="text-gray-400 block">Modal Price:</span>
                <span className="text-base font-extrabold text-agri-primary">₹{item.modalPrice} / Quintal</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
