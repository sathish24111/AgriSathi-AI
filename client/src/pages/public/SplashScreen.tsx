import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/language');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-primary to-agri-secondary flex flex-col items-center justify-center text-white p-4">
      <div className="animate-bounce mb-4 bg-white/20 p-6 rounded-3xl border border-white/30 backdrop-blur-sm">
        <Sprout className="h-16 w-16 text-agri-accent" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">AgriSathi AI</h1>
      <p className="text-sm text-green-200 mt-2 font-medium">Your Intelligent Farming Companion</p>

      <div className="mt-8 flex items-center space-x-2 text-xs text-green-100">
        <div className="w-2 h-2 rounded-full bg-agri-accent animate-ping" />
        <span>Loading Smart Agricultural Platform...</span>
      </div>
    </div>
  );
};
