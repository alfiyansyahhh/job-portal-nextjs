'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslation from '../locales/en.json';
import indonesiaTranslation from '../locales/id.json';

const resources = {
  ENG: {
    translation: englishTranslation,
  },
  INA: {
    translation: indonesiaTranslation,
  },
};

// Cek apakah sedang di browser
const isClient = typeof window !== 'undefined';

const savedLang = isClient
  ? localStorage.getItem('appLanguage') || 'INA'
  : 'INA';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
