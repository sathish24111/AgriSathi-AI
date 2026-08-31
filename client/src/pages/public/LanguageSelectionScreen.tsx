import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n/translations';
import { Globe, CheckCircle2, ArrowRight } from 'lucide-react';

export const LanguageSelectionScreen: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const languages = [
    { code: 'mr', native: 'मराठी', english: 'Marathi', flag: '🚩' },
    { code: 'hi', native: 'हिंदी', english: 'Hindi', flag: '🇮🇳' },
    { code: 'en', native: 'English', english: 'English', flag: '🌐' },
    { code: 'ta', native: 'தமிழ்', english: 'Tamil', flag: '🌾' }
  ];

  return (
    <div className="min-h-screen bg-agri-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center space-y-6">
        
        <div className="inline-flex p-4 bg-green-100 rounded-full text-agri-primary">
          <Globe className="h-10 w-10" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Select Your Language</h1>
          <p className="text-xs text-gray-500 mt-1">All information and voice guidance will be provided in your language.</p>
        </div>

        {/* 2x2 Flag Grid */}
        <div className="grid grid-cols-2 gap-4 text-left">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => setLanguage(lang.code as Language)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-green-50 border-agri-primary shadow-sm'
                    : 'bg-white border-gray-200 hover:border-agri-primary'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{lang.flag}</span>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-agri-primary" />}
                </div>

                <div className="mt-3">
                  <span className="font-extrabold text-lg text-agri-primary block">{lang.native}</span>
                  <span className="text-xs text-gray-400 block">{lang.english}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-agri-primary text-white font-bold py-3.5 rounded-xl shadow hover:bg-agri-secondary transition flex items-center justify-center space-x-2"
        >
          <span>Continue / पुढे जा</span>
          <ArrowRight className="h-5 w-5" />
        </button>

      </div>
    </div>
  );
};
