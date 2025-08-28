
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import bn from '@/locales/bn.json';
import te from '@/locales/te.json';
import mr from '@/locales/mr.json';

type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr';

const translations = { en, hi, bn, te, mr };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [loadedTranslations, setLoadedTranslations] = useState(translations.en);

  useEffect(() => {
    setLoadedTranslations(translations[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: loadedTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
