import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { AdminAnalytics } from '../../types';
import { ShieldCheck, Users, Activity, Bell, Sprout, TrendingUp, Search, CheckCircle2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'farmers' | 'scans' | 'diseases' | 'alerts'>('overview');

  useEffect(() => {
    apiClient.getAdminAnalytics().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return <div className="p-12 text-center text-gray-500">Loading Admin Portal Analytics...</div>;
  }

  const { metrics, scanTrends, cropDistribution, farmers, scans, alerts } = data;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-agri-dark text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-agri-accent text-gray-900 rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">AgriSathi AI Admin Portal</h1>
            <p className="text-xs text-gray-300">National Crop Disease Surveillance & Platform Management</p>
          </div>
        </div>

        <div className="flex bg-white/10 p-1 rounded-xl text-xs font-bold space-x-1">
          {['overview', 'farmers', 'scans', 'diseases', 'alerts'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`px-3 py-1.5 rounded-lg capitalize transition ${
                activeTab === t ? 'bg-agri-accent text-gray-900 shadow' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top Key Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Farmers</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-gray-900">{metrics.totalFarmers}</span>
            <Users className="h-5 w-5 text-agri-primary" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Crop Scans</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-gray-900">{metrics.totalScans}</span>
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">Active Risk Alerts</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-gray-900">{metrics.activeAlerts}</span>
            <Bell className="h-5 w-5 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">Diseases Tracked</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-gray-900">{metrics.diseasesDetected}</span>
            <Sprout className="h-5 w-5 text-amber-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">Highest Risk Crop</span>
          <div className="text-sm font-bold text-red-700 truncate mt-1">
            {metrics.mostAffectedCrop}
          </div>
        </div>

      </div>

      {/* OVERVIEW TAB CONTENT */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Scan Volume Trends Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-agri-primary" />
              <span>Monthly Scan Volume Trends</span>
            </h3>

            <div className="space-y-3 pt-2">
              {scanTrends.map((st) => (
                <div key={st.month} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>{st.month}</span>
                    <span>{st.scans} scans</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-agri-primary rounded-full transition-all"
                      style={{ width: `${(st.scans / 3000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Crop Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-agri-primary" />
              <span>Regional Crop Distribution (%)</span>
            </h3>

            <div className="space-y-3 pt-2">
              {cropDistribution.map((cd) => (
                <div key={cd.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>{cd.name}</span>
                    <span>{cd.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${cd.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* FARMERS TAB CONTENT */}
      {activeTab === 'farmers' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b font-bold text-sm text-gray-900">Registered Farmers Directory</div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">District & State</th>
                <th className="p-3">Primary Crop</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {farmers.map((f) => (
                <tr key={f._id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{f.name}</td>
                  <td className="p-3">{f.phone}</td>
                  <td className="p-3">{f.district}, {f.state}</td>
                  <td className="p-3 font-semibold text-agri-primary">{f.primaryCrop}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {f.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SCANS TAB CONTENT */}
      {activeTab === 'scans' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b font-bold text-sm text-gray-900">Recent Crop Disease Scans Monitoring</div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase">
                <th className="p-3">Scan ID</th>
                <th className="p-3">Crop</th>
                <th className="p-3">Disease Identified</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scans.map((s) => (
                <tr key={s.scanId} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-700">{s.scanId}</td>
                  <td className="p-3 font-bold">{s.cropName}</td>
                  <td className="p-3 text-red-700 font-bold">{s.diseaseName}</td>
                  <td className="p-3 font-bold">{s.confidence}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800">
                      {s.riskLevel}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{s.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
