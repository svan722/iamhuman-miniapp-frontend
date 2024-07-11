import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';
import deTranslations from '../locales/de.json';
import esTranslations from '../locales/es.json';
import zhTranslations from '../locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      Eng: { translation: enTranslations },
      Fr: { translation: frTranslations },
      De: { translation: deTranslations },
      Es: { translation: esTranslations },
      Zh: { translation: zhTranslations },
    },
    lng: 'Eng', // Set the default language
    fallbackLng: 'Eng', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;