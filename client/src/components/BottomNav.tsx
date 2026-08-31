import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, ScanLine, Sprout, Bell, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/crops', label: t('nav.crops'), icon: Sprout },
    { to: '/scanner', label: t('nav.scan'), icon: ScanLine, isScanner: true },
    { to: '/alerts', label: t('nav.alerts'), icon: Bell },
    { to: '/profile', label: t('nav.profile'), icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden px-2 py-1 shadow-lg">
      <div className="flex justify-around items-center h-14">
        {items.map((item) => {
          const Icon = item.icon;
          if (item.isScanner) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="bg-agri-primary text-white p-3.5 rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold text-agri-primary mt-0.5">{item.label}</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-agri-primary font-bold' : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
