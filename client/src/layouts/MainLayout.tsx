import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-agri-surface flex flex-col">
      <Header />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
