import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanLine, 
  TrendingUp, 
  CalendarDays, 
  AlertTriangle, 
  UserCircle 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Crop Health Scanner', path: '/scanner', icon: ScanLine },
    { label: 'Mandi Rates', path: '/market', icon: TrendingUp },
    { label: 'Crop Planner', path: '/planner', icon: CalendarDays },
    { label: 'Risk Alerts', path: '/alerts', icon: AlertTriangle },
    { label: 'Farmer Profile', path: '/profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-1">
        <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Main Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-emerald-900 text-white rounded-xl p-3 text-xs">
          <p className="font-bold mb-1">🌾 Kisan Call Center</p>
          <p className="text-emerald-200">Toll Free: 1800-180-1551</p>
        </div>
      </div>
    </aside>
  );
};

