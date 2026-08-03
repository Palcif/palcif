import { useTranslation } from 'react-i18next'

import type { WpLanguageCode } from '@/i18n/languages'
import { DEFAULT_LANGUAGE, isSupportedLanguage, toWpLanguageCode } from '@/i18n/languages'

export type { WpLanguageCode }

export function useWpLanguage(): WpLanguageCode {
  const { i18n } = useTranslation()
  const lang = isSupportedLanguage(i18n.language) ? i18n.language : DEFAULT_LANGUAGE
  return toWpLanguageCode(lang)
}
