import { useParams } from 'react-router'

import type { WpLanguageCode } from '@/i18n/languages'
import { DEFAULT_LANGUAGE, isSupportedLanguage, toWpLanguageCode } from '@/i18n/languages'

export type { WpLanguageCode }

export function useWpLanguage(): WpLanguageCode {
  const { lang } = useParams<{ lang?: string }>()
  const resolved = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE
  return toWpLanguageCode(resolved)
}
