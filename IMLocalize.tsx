import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { LanguageDetectorModule } from "i18next";

import en from './Translations/en';
import ar from './Translations/ar';

const LANGUAGES = {
  en,
  ar
};

const LANG_CODES = Object.keys(LANGUAGES);

// const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR: LanguageDetectorModule = {
    type: "languageDetector",
    detect: () => {
      AsyncStorage.getItem("user-language", (err, language) => {
        // if error fetching stored data or no language was stored
        // display errors when in DEV mode as console statements
        if (err || !language) {
          if (err) {
            console.log("Error fetching Languages from asyncstorage ", err);
          } else {
            console.log("No language is set, choosing English as fallback");
          }
        }
  
        return language;
      });
      return "en";
    },
    init: () => {},
    cacheUserLanguage: (language: string) => {
      AsyncStorage.setItem("user-language", language);
    },
  };
  
  i18n
    // detect language
    .use(LANGUAGE_DETECTOR)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // set options
    .init({
      compatibilityJSON: "v3",
      resources: LANGUAGES,
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });