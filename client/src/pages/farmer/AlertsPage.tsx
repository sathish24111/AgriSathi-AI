import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { RiskAlert } from '../../types';
import { RiskBadge } from '../../components/RiskBadge';
import { Bell, ShieldAlert, AlertCircle, CloudRain, Bug } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);

  useEffect(() => {
    apiClient.getAlerts().then(setAlerts).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-3">
        <div className="p-3 bg-red-100 text-red-700 rounded-xl">
          <Bell className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Crop & Weather Risk Alerts</h1>
          <p className="text-sm text-gray-500">Real-time agricultural risk advisories for your region</p>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 uppercase">
                  {alert.category}
                </span>
                <span className="text-xs text-gray-400">• {alert.date} • {alert.region}</span>
              </div>
              <RiskBadge level={alert.severity} />
            </div>

            <h3 className="font-bold text-lg text-gray-900">{alert.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{alert.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
