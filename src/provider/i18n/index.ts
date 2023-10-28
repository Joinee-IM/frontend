import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from '@/provider/i18n/locales/zh/translation.json';

void i18next.use(initReactI18next).init({
  lng: 'zh', // if you're using a language detector, do not define the lng option
  fallbackLng: 'zh',
  debug: true,
  resources: {
    zh: {
      translation,
    },
  },
});
