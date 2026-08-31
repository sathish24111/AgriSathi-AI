import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { Crop } from '../../types';
import { Sprout, Calendar, MapPin, Activity, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export const CropDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [crop, setCrop] = useState<Crop | null>(null);

  useEffect(() => {
    if (id) {
      apiClient.getCropById(id).then(setCrop).catch(console.error);
    }
  }, [id]);

  if (!crop) {
    return <div className="p-8 text-center text-gray-500">Loading crop details...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Back Header */}
      <div className="flex items-center space-x-4">
        <Link to="/crops" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{crop.name}</h1>
          <p className="text-xs text-gray-500">{crop.variety} • {crop.farmLocation}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase">Health Status</span>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-gray-900">{crop.healthStatus}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase">Growth Stage</span>
          <div className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-agri-primary" />
            <span className="text-xl font-bold text-gray-900">{crop.growthStage}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase">Planting Date</span>
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">{crop.plantingDate}</span>
          </div>
        </div>

      </div>

      {/* Timeline Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-gray-900">Crop Growth Timeline & Milestones</h3>

        <div className="space-y-4 pt-2">
          {[
            { stage: '1. Sowing & Nursery Bed', status: 'Completed', date: 'Days 1 - 25' },
            { stage: '2. Vegetative Growth & Root Drench', status: 'Completed', date: 'Days 26 - 50' },
            { stage: '3. Flowering & Fruiting Window', status: 'Current Stage', date: 'Days 51 - 85', active: true },
            { stage: '4. Harvesting & Grading for Market', status: 'Upcoming', date: 'Days 86 - 120' }
          ].map((t, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between ${t.active ? 'bg-green-50 border-agri-primary font-bold' : 'bg-gray-50 border-gray-200'}`}>
              <div>
                <h4 className="text-sm text-gray-900">{t.stage}</h4>
                <span className="text-xs text-gray-500">{t.date}</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${t.active ? 'bg-agri-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
