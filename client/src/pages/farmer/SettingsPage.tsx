import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n/translations';
import { Settings, Globe, Bell, Volume2, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-3">
        <div className="p-3 bg-green-100 text-agri-primary rounded-xl">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Application Settings</h1>
          <p className="text-sm text-gray-500">Configure language, notifications, and speech playback</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        
        {/* Language Row */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-agri-primary" />
            <div>
              <h3 className="font-bold text-sm text-gray-900">Regional Language</h3>
              <p className="text-xs text-gray-500">Select app interface & voice language</p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-gray-50 border border-gray-300 rounded-xl text-xs px-4 py-2 font-bold focus:outline-none cursor-pointer"
          >
            <option value="en">English (🌐)</option>
            <option value="hi">हिंदी (🇮🇳)</option>
            <option value="mr">मराठी (🚩)</option>
            <option value="ta">தமிழ் (🌾)</option>
          </select>
        </div>

        {/* Notifications Toggle */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-agri-primary" />
            <div>
              <h3 className="font-bold text-sm text-gray-900">Weather & Disease Risk Alerts</h3>
              <p className="text-xs text-gray-500">Receive SMS and push notifications for regional crop risks</p>
            </div>
          </div>

          <input type="checkbox" defaultChecked className="w-5 h-5 accent-agri-primary cursor-pointer" />
        </div>

        {/* Voice TTS Toggle */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Volume2 className="h-5 w-5 text-agri-primary" />
            <div>
              <h3 className="font-bold text-sm text-gray-900">Voice Advisory Speech Synthesis</h3>
              <p className="text-xs text-gray-500">Enable text-to-speech audio for diagnosis recommendations</p>
            </div>
          </div>

          <input type="checkbox" defaultChecked className="w-5 h-5 accent-agri-primary cursor-pointer" />
        </div>

      </div>

    </div>
  );
};
