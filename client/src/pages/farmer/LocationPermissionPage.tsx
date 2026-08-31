import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { autoDetectLocation } from '../../utils/geolocation';
import { MapPin, Navigation, CheckCircle2, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';

export const LocationPermissionPage: React.FC = () => {
  const { user, updateUserLocation } = useAuth();
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState(user?.district || 'Nashik');
  const [detecting, setDetecting] = useState(false);
  const [detectedMessage, setDetectedMessage] = useState('');

  const districts = ['Nashik', 'Pune', 'Nagpur', 'Kolhapur', 'Solapur', 'Chhatrapati Sambhajinagar', 'Satara'];

  const handleAutoDetect = async () => {
    setDetecting(true);
    setDetectedMessage('');

    try {
      const geo = await autoDetectLocation();
      setSelectedDistrict(geo.district);
      updateUserLocation(geo.district, geo.state);
      setDetectedMessage(`GPS Location Lock: ${geo.district}, ${geo.state}`);
    } catch (err) {
      setSelectedDistrict('Nashik');
      setDetectedMessage('GPS Fallback: Nashik, Maharashtra');
    } finally {
      setDetecting(false);
    }
  };

  const handleProceed = () => {
    updateUserLocation(selectedDistrict, 'Maharashtra');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-agri-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center space-y-6">
        
        <div className="inline-flex p-4 bg-green-100 rounded-full text-agri-primary">
          <MapPin className="h-10 w-10" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Select Your Location</h1>
          <p className="text-xs text-gray-500 mt-1">
            Location access is required to show weather, crop risks, and nearby APMC market rates.
          </p>
        </div>

        {/* Auto-Detect GPS Button */}
        <button
          onClick={handleAutoDetect}
          disabled={detecting}
          className="w-full bg-agri-primary text-white font-bold py-3.5 rounded-xl shadow hover:bg-agri-secondary transition flex items-center justify-center space-x-2 text-sm"
        >
          {detecting ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Detecting GPS Location...</span>
            </>
          ) : (
            <>
              <Navigation className="h-5 w-5" />
              <span>Auto-Detect Location (GPS)</span>
            </>
          )}
        </button>

        {detectedMessage && (
          <div className="p-3 bg-green-100 border border-green-300 text-agri-primary text-xs font-bold rounded-xl flex items-center justify-center space-x-2 animate-fade-in">
            <Sparkles className="h-4 w-4 text-agri-accent shrink-0" />
            <span>{detectedMessage}</span>
          </div>
        )}

        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Or select your district manually:
        </div>

        {/* District Selector List */}
        <div className="space-y-2 text-left max-h-56 overflow-y-auto pr-1">
          {districts.map((d) => {
            const isSelected = selectedDistrict === d;
            return (
              <div
                key={d}
                onClick={() => {
                  setSelectedDistrict(d);
                  updateUserLocation(d, 'Maharashtra');
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-green-50 border-agri-primary font-bold text-agri-primary'
                    : 'bg-white border-gray-200 hover:border-agri-primary text-gray-800'
                }`}
              >
                <span className="text-sm">{d}, Maharashtra</span>
                {isSelected && <CheckCircle2 className="h-5 w-5 text-agri-primary" />}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleProceed}
          className="w-full bg-agri-primary text-white font-bold py-3.5 rounded-xl shadow hover:bg-agri-secondary transition flex items-center justify-center space-x-2 text-sm"
        >
          <span>Proceed to Home Dashboard</span>
          <ArrowRight className="h-5 w-5" />
        </button>

      </div>
    </div>
  );
};
