import React, { useState } from 'react';
import { Upload, Scan, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DiseaseResult } from '../../types';

export const CropScannerWidget: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleSimulateScan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        scanId: 'scan_101',
        cropName: 'Tomato',
        diseaseName: 'Early Blight (Alternaria solani)',
        confidence: 94,
        riskLevel: 'HIGH',
        severity: 'Moderate Leaf Spotting',
        explanation: 'Fungal infection characterized by concentric ring leaf spots and yellow halos.',
        advisory: {
          summary: 'Apply organic neem extract and Copper Oxychloride spray.',
          symptoms: ['Brown-black spots with concentric rings', 'Yellow halo surrounding lesions'],
          organicControl: ['Neem seed kernel extract (NSKE 5%)', 'Trichoderma viride foliar spray'],
          recommendedPractice: ['Avoid overhead irrigation', 'Ensure 60cm plant spacing'],
          safetyDisclaimer: 'Consult local agricultural authorities before applying chemicals.',
        },
        timestamp: new Date().toISOString(),
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
          <Scan className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base">AI Crop Health Diagnosis</h3>
          <p className="text-xs text-slate-500">Instant leaf scan and disease cure</p>
        </div>
      </div>

      {!result ? (
        <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 text-center hover:bg-emerald-50/50 transition-colors">
          <Upload className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
          <p className="text-sm font-semibold text-slate-800">Upload or capture crop leaf photo</p>
          <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG up to 10MB</p>
          <button
            onClick={handleSimulateScan}
            disabled={analyzing}
            className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            {analyzing ? 'Analyzing with AI Model...' : 'Simulate Diagnosis'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md">
                  {result.riskLevel} Risk
                </span>
                <h4 className="font-bold text-slate-800 text-base mt-1">{result.diseaseName}</h4>
                <p className="text-xs text-slate-600 mt-0.5">Crop: <strong>{result.cropName}</strong> • Confidence: <strong>{result.confidence}%</strong></p>
              </div>
            </div>
            <p className="text-xs text-slate-700 mt-2 bg-white/70 p-2.5 rounded-lg border border-amber-100">
              {result.explanation}
            </p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Organic Treatment</span>
            </div>
            <ul className="list-disc list-inside text-slate-700 space-y-1 pl-1">
              {result.advisory.organicControl.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setResult(null)}
            className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Scan Another Crop
          </button>
        </div>
      )}
    </div>
  );
};

