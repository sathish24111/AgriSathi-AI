import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { LandingPage } from '../pages/public/LandingPage';
import { SplashScreen } from '../pages/public/SplashScreen';
import { LanguageSelectionScreen } from '../pages/public/LanguageSelectionScreen';
import { Login } from '../pages/public/Login';
import { Register } from '../pages/public/Register';
import { ForgotPassword } from '../pages/public/ForgotPassword';
import { LocationPermissionPage } from '../pages/farmer/LocationPermissionPage';
import { FarmerDashboard } from '../pages/farmer/FarmerDashboard';
import { CropManagement } from '../pages/farmer/CropManagement';
import { CropDetail } from '../pages/farmer/CropDetail';
import { CropPlannerPage } from '../pages/farmer/CropPlannerPage';
import { MarketPricesPage } from '../pages/farmer/MarketPricesPage';
import { CropScanner } from '../pages/farmer/CropScanner';
import { DiseaseResultScreen } from '../pages/farmer/DiseaseResultScreen';
import { ScanHistory } from '../pages/farmer/ScanHistory';
import { AlertsPage } from '../pages/farmer/AlertsPage';
import { AIAssistantPage } from '../pages/farmer/AIAssistantPage';
import { ProfilePage } from '../pages/farmer/ProfilePage';
import { SettingsPage } from '../pages/farmer/SettingsPage';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Exact Android APK Onboarding Flow Routes */}
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/language" element={<LanguageSelectionScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/location" element={<ProtectedRoute><LocationPermissionPage /></ProtectedRoute>} />

      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Farmer Portal Main Layout Routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<FarmerDashboard />} />
        <Route path="/crops" element={<CropManagement />} />
        <Route path="/crops/:id" element={<CropDetail />} />
        <Route path="/planner" element={<CropPlannerPage />} />
        <Route path="/market" element={<MarketPricesPage />} />
        <Route path="/scanner" element={<CropScanner />} />
        <Route path="/scanner/result/:id" element={<DiseaseResultScreen />} />
        <Route path="/history" element={<ScanHistory />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/assistant" element={<AIAssistantPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Admin Portal Routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
