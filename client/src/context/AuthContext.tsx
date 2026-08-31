import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUserLocation: (district: string, state?: string) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agrisathi_user');
    return saved ? JSON.parse(saved) : {
      _id: 'user_1',
      name: 'Sambhaji Patil',
      phone: '+91 98765 43210',
      email: 'sambhaji@agrisathi.ai',
      role: 'FARMER',
      state: 'Maharashtra',
      district: 'Nashik',
      preferredLanguage: 'en',
      primaryCrop: 'Tomato'
    };
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('agrisathi_token') || 'demo_token');

  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('agrisathi_user', JSON.stringify(userData));
    localStorage.setItem('agrisathi_token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agrisathi_user');
    localStorage.removeItem('agrisathi_token');
  };

  const updateUserLocation = (district: string, state: string = 'Maharashtra') => {
    if (user) {
      const updated = { ...user, district, state };
      setUser(updated);
      localStorage.setItem('agrisathi_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      updateUserLocation,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
