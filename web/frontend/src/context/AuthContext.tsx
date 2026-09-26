import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    return {
      id: 'usr_1',
      name: 'Sambhaji Patil',
      phone: '+91 98765 43210',
      location: 'Nashik, Maharashtra',
      preferredLanguage: 'mr',
      totalLandAcres: 3.5,
    };
  });

  const login = async (phone: string) => {
    setUser({
      id: 'usr_1',
      name: 'Farmer User',
      phone,
      location: 'Nashik, Maharashtra',
      preferredLanguage: 'mr',
      totalLandAcres: 3.0,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

