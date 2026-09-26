import React from 'react';
import { AlertTriangle, CloudRain, Bug, ShieldAlert } from 'lucide-react';

export const Alerts: React.FC = () => {
  const alerts = [
    {
      id: '1',
      title: 'High Humidity Pest Advisory',
      category: 'PEST',
      desc: 'High morning humidity (>80%) favors thrips and whitefly infestation in Onion and Chili crops. Consider yellow sticky traps.',
      severity: 'HIGH',
      date: 'Today, 06:00 AM',
    },
    {
      id: '2',
      title: 'Light Scattered Showers Expected',
      category: 'WEATHER',
      desc: 'Moderate cloud cover with 20% precipitation chance predicted over Nashik district for the next 48 hours.',
      severity: 'MODERATE',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Early Warning Risk Alerts</h2>
        <p className="text-sm text-slate-500">Real-time alerts on disease outbreaks, pest threats, and adverse weather</p>
      </div>

      <div className="space-y-4">
        {alerts.map((a) => (
          <div key={a.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-start space-x-4">
            <div className={`p-2.5 rounded-xl ${a.severity === 'HIGH' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-base">{a.title}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">{a.category}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{a.desc}</p>
              <p className="text-[11px] text-slate-400 mt-2">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

