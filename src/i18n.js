import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import global_en from "./translations/en/global.json"
import global_es from "./translations/es/global.json"
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';


i18next.use(I18nextBrowserLanguageDetector)
i18next.use(initReactI18next)

i18next.init({
  interpolation: {escapeValue: false},
  fallbackLng: "es",
  resources: { 
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
});

export default i18next;