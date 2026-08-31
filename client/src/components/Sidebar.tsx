import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ScanLine,
  Sprout,
  Bell,
  MessageSquare,
  User,
  Settings,
  ShieldCheck,
  Camera
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/crops', label: t('nav.crops'), icon: Sprout },
    { to: '/alerts', label: t('nav.alerts'), icon: Bell, badge: 2 },
    { to: '/assistant', label: t('nav.assistant'), icon: MessageSquare },
    { to: '/profile', label: t('nav.profile'), icon: User }
  ];

  if (user?.role === 'ADMIN') {
    navItems.push({ to: '/admin', label: t('nav.admin'), icon: ShieldCheck });
  }

  return (
    <aside className="w-64 bg-[#f8faf9] border-r border-gray-200 min-h-[calc(100vh-4rem)] hidden md:flex flex-col justify-between p-4 shrink-0">
      
      {/* Top Branding & Navigation */}
      <div className="space-y-6">
        <div>
          <h2 className="font-extrabold text-xl text-gray-900 tracking-tight">AgriSathi AI</h2>
          <span className="text-xs text-gray-500 font-medium">Farmer Dashboard</span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-[#22c55e] text-white shadow-sm font-bold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned Scan Button (Matching exact UI Mockup) */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => navigate('/scanner')}
          className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 px-4 rounded-xl shadow transition flex items-center justify-center space-x-2 text-sm"
        >
          <Camera className="h-5 w-5" />
          <span>Scan Crop</span>
        </button>
      </div>

    </aside>
  );
};
