import { useTranslation } from 'react-i18next'

export type WpLanguageCode = 'EN' | 'AR' | 'FI'

const LANGUAGE_MAP: Record<string, WpLanguageCode> = {
  en: 'EN',
  ar: 'AR',
  fi: 'FI',
}

export function useWpLanguage(): WpLanguageCode {
  const { i18n } = useTranslation()
  return LANGUAGE_MAP[i18n.language] ?? 'EN'
}
