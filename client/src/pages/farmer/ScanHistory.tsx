import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { DiseaseScanResult } from '../../types';
import { RiskBadge } from '../../components/RiskBadge';
import { History, Search, Filter, ChevronRight, Calendar, Sprout } from 'lucide-react';

export const ScanHistory: React.FC = () => {
  const [scans, setScans] = useState<DiseaseScanResult[]>([]);
  const [search, setSearch] = useState('');
  const [filterCrop, setFilterCrop] = useState('ALL');

  useEffect(() => {
    apiClient.getScanHistory().then(setScans).catch(console.error);
  }, []);

  const filteredScans = scans.filter((s) => {
    const matchesSearch = s.cropName.toLowerCase().includes(search.toLowerCase()) ||
                          s.diseaseName.toLowerCase().includes(search.toLowerCase());
    const matchesCrop = filterCrop === 'ALL' || s.cropName.toLowerCase() === filterCrop.toLowerCase();
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Crop Scan History</h1>
          <p className="text-sm text-gray-500 mt-1">Previous crop disease diagnoses and recommendations</p>
        </div>

        {/* Search & Filter Inputs */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crop or disease..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-xl text-xs px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Crops</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton">Cotton</option>
            <option value="Paddy">Paddy</option>
          </select>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {filteredScans.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500">
            <History className="h-10 w-10 mx-auto text-gray-300 mb-2" />
            <p className="font-bold text-gray-700">No matching scan history records</p>
          </div>
        ) : (
          filteredScans.map((scan) => (
            <Link
              key={scan.scanId}
              to={`/scanner/result/${scan.scanId}`}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-agri-primary transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-gray-100 border overflow-hidden shrink-0">
                  <img src={scan.imageUrl} alt={scan.cropName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-agri-primary transition-colors">
                    {scan.cropName} • <span className="text-red-700">{scan.diseaseName}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Confidence: <strong>{scan.confidence}%</strong> • Location: {scan.location} • Severity: {scan.severity}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-center">
                <RiskBadge level={scan.riskLevel} />
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
};
