import React, { createContext, useContext, useState } from 'react';

export interface Language {
  code: string;
  nameNative: string;
  nameEnglish: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'mr', nameNative: 'मराठी', nameEnglish: 'Marathi' },
  { code: 'hi', nameNative: 'हिन्दी', nameEnglish: 'Hindi' },
  { code: 'en', nameNative: 'English', nameEnglish: 'English' },
  { code: 'kn', nameNative: 'ಕನ್ನಡ', nameEnglish: 'Kannada' },
  { code: 'te', nameNative: 'తెలుగు', nameEnglish: 'Telugu' },
  { code: 'ta', nameNative: 'தமிழ்', nameEnglish: 'Tamil' },
];

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('mr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

