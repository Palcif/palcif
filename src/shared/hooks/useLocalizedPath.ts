import { useParams } from 'react-router'

import { DEFAULT_LANGUAGE, isSupportedLanguage } from '@/i18n/languages'

export function useLocalizedPath(): (path: string) => string {
  const { lang } = useParams<{ lang?: string }>()
  const activeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE
  return (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`
    const firstSegment = normalized.split('/')[1]
    if (isSupportedLanguage(firstSegment)) {
      // Already has a language prefix (e.g. a hand-typed WordPress CMS
      // field value) — don't prefix it a second time.
      return normalized
    }
    return `/${activeLang}${normalized}`
  }
}
