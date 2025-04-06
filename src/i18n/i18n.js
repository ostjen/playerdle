import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import ptTranslation from './locales/pt.json';
import esTranslation from './locales/es.json';

// Map of language variants to their main language codes
const languageMapping = {
  // English variants
  'en-US': 'en',
  'en-GB': 'en',
  'en-AU': 'en',
  'en-CA': 'en',
  'en-NZ': 'en',
  'en-ZA': 'en',
  'en-IN': 'en',
  
  // Spanish variants
  'es-ES': 'es',
  'es-MX': 'es', 
  'es-AR': 'es',
  'es-CO': 'es',
  'es-CL': 'es',
  'es-PE': 'es',
  'es-VE': 'es',
  'es-EC': 'es',
  'es-GT': 'es',
  'es-CU': 'es',
  'es-BO': 'es',
  'es-DO': 'es',
  'es-HN': 'es',
  'es-PY': 'es',
  'es-SV': 'es',
  'es-NI': 'es',
  'es-CR': 'es',
  'es-PR': 'es',
  'es-PA': 'es',
  'es-UY': 'es',
  
  // Portuguese variants
  'pt-BR': 'pt',
  'pt-PT': 'pt',
  'pt-AO': 'pt',
  'pt-MZ': 'pt',
  'pt-GW': 'pt',
  'pt-TL': 'pt',
  'pt-CV': 'pt',
  'pt-ST': 'pt'
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      pt: {
        translation: ptTranslation
      },
      es: {
        translation: esTranslation
      }
    },
    fallbackLng: {
      default: ['en'],
      ...Object.fromEntries(Object.entries(languageMapping).map(([key, value]) => [key, [value, 'en']]))
    },
    load: 'languageOnly', // Only load the language without region code ('en' instead of 'en-US')
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    }
  });

// Save selected language to localStorage when changed
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n; 