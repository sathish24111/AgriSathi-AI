import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { User, Phone, Mail, MapPin, Globe, Sprout, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-agri-primary to-agri-secondary text-white p-8 rounded-2xl shadow-md flex items-center space-x-5">
        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl border border-white/30">
          👨‍🌾
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">{user?.name}</h1>
          <p className="text-sm text-green-200 mt-0.5">{user?.role} Profile • {user?.district}, {user?.state}</p>
          <div className="mt-2 inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
            <Sprout className="h-4 w-4 text-agri-accent" />
            <span>Primary Crop: {user?.primaryCrop}</span>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-gray-900 text-base border-b pb-3">Personal & Farm Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-agri-surface rounded-xl border border-green-100 flex items-center space-x-3">
            <Phone className="h-5 w-5 text-agri-primary shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block">Mobile Number</span>
              <span className="font-bold text-gray-900">{user?.phone}</span>
            </div>
          </div>

          <div className="p-3 bg-agri-surface rounded-xl border border-green-100 flex items-center space-x-3">
            <Mail className="h-5 w-5 text-agri-primary shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block">Email Address</span>
              <span className="font-bold text-gray-900">{user?.email}</span>
            </div>
          </div>

          <div className="p-3 bg-agri-surface rounded-xl border border-green-100 flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-agri-primary shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block">District & State</span>
              <span className="font-bold text-gray-900">{user?.district}, {user?.state}</span>
            </div>
          </div>

          <div className="p-3 bg-agri-surface rounded-xl border border-green-100 flex items-center space-x-3">
            <Globe className="h-5 w-5 text-agri-primary shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block">Preferred Interface Language</span>
              <span className="font-bold text-gray-900 uppercase">{language}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
