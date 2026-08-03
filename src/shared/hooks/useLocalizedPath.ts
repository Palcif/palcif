import { useParams } from 'react-router'

import { DEFAULT_LANGUAGE, isSupportedLanguage } from '@/i18n/languages'

export function useLocalizedPath(): (path: string) => string {
  const { lang } = useParams<{ lang?: string }>()
  const activeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE
  return (path: string) => `/${activeLang}${path.startsWith('/') ? path : `/${path}`}`
}
