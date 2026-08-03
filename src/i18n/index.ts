import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LANGUAGE } from './languages'
import arCommon from './locales/ar/common.json'
import enCommon from './locales/en/common.json'
import fiCommon from './locales/fi/common.json'

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    fi: { common: fiCommon },
    ar: { common: arCommon },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
