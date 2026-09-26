import React from 'react';
import { Phone, MapPin, Globe, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { languages, language } = useLanguage();

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Farmer Profile & Settings</h2>
        <p className="text-sm text-slate-500">Manage your farm details, registered crops, and language preferences</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-2xl font-bold">
            🌾
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{user?.name || 'Sambhaji Patil'}</h3>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">Verified AgriSathi Member</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <Phone className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-slate-500">Contact Number</p>
              <p className="font-semibold text-slate-800">{user?.phone || '+91 98765 43210'}</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-slate-500">Farm Location</p>
              <p className="font-semibold text-slate-800">{user?.location || 'Nashik, Maharashtra'}</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <Globe className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-slate-500">App Language</p>
              <p className="font-semibold text-slate-800">{currentLang?.nameNative} ({currentLang?.nameEnglish})</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
            <Award className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-slate-500">Total Farm Size</p>
              <p className="font-semibold text-slate-800">{user?.totalLandAcres || 3.5} Acres</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

