import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './common';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    interpolation: { escapeValue: false },
    resources: translations,
    lng: 'en',
    fallbackLng: 'en',
  });
