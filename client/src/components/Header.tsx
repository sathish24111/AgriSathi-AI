import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe, User, LogOut, ShieldCheck, Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="bg-agri-primary text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
              <Sprout className="h-6 w-6 text-agri-accent" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight block">AgriSathi AI</span>
              <span className="text-xs text-green-200 block font-normal">{t('app.tagline')}</span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
              <Globe className="h-4 w-4 text-green-200" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
              >
                <option value="en" className="text-gray-900">English (🌐)</option>
                <option value="hi" className="text-gray-900">हिंदी (🇮🇳)</option>
                <option value="mr" className="text-gray-900">मराठी (🚩)</option>
                <option value="ta" className="text-gray-900">தமிழ் (🌾)</option>
              </select>
            </div>

            {/* Auth Profile / Actions */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 bg-agri-accent text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-yellow-400 transition"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Admin Portal</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
                >
                  <User className="h-4 w-4 text-green-200" />
                  <span className="text-sm font-medium hidden sm:inline">{user?.name}</span>
                </Link>

                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white hover:text-green-200 px-3 py-1.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold bg-white text-agri-primary hover:bg-green-50 px-4 py-1.5 rounded-lg transition shadow"
                >
                  Register
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
