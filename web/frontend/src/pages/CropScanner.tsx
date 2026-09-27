import React from 'react';
import { CropScannerWidget } from '../components/dashboard/CropScannerWidget';
import { History, ShieldCheck, Sparkles } from 'lucide-react';

export const CropScanner: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Crop Health Scanner & Diagnosis</h2>
        <p className="text-sm text-slate-500">Detect diseases instantly with AI-powered leaf diagnostics</p>
      </div>

      <CropScannerWidget />

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-600" />
          <span>Recent Scan History</span>
        </h3>
        <div className="divide-y divide-slate-100 text-sm">
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">Tomato • Early Blight</p>
              <p className="text-xs text-slate-500">22 Sep 2026 • 94% Confidence</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">Treated</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">Onion • Purple Blotch</p>
              <p className="text-xs text-slate-500">18 Sep 2026 • 89% Confidence</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold">Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

