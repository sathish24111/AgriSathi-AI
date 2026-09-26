import React from 'react';
import { Bell, Globe, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const { language, setLanguage, languages } = useLanguage();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">🌾</span>
        <div>
          <h1 className="text-lg font-bold text-emerald-800 leading-tight">AgriSathi AI</h1>
          <p className="text-xs text-slate-500">Smart Agricultural Assistant</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Language selector */}
        <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-sm border border-slate-200">
          <Globe className="w-4 h-4 text-slate-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select Language"
            className="bg-transparent border-none text-slate-800 text-xs font-medium focus:outline-none cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nameNative} ({lang.nameEnglish})
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <button 
          aria-label="View notifications"
          className="relative p-2 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-800">{user?.name || 'Farmer'}</p>
            <p className="text-[10px] text-slate-500">{user?.location || 'Maharashtra'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

