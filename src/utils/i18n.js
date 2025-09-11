import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


import {ENLanguage} from "./languages/en.js";
import {FRLanguage} from "./languages/fr.js";

const resources = {
    en: {translation: ENLanguage},
    fr: {translation: FRLanguage}
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        lng: 'en',
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false
        }
    });

export const AvailableLanguages = [
    {
        code: 'en',
        name: 'English',
        countryCode: 'gb',
        flagCode: 'GB'
    },
    {
        code: 'fr',
        name: 'Français',
        countryCode: 'fr',
        flagCode: 'FR'
    }
]

export default i18n;
