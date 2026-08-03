export const SUPPORTED_LANGUAGES = ['en', 'ar', 'fi'] as const

export type Lang = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Lang = 'en'

export const RTL_LANGUAGES: readonly string[] = ['ar']

export function isSupportedLanguage(value: string | undefined | null): value is Lang {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value ?? '')
}

export type WpLanguageCode = 'EN' | 'AR' | 'FI'

const WP_LANGUAGE_CODES: Record<Lang, WpLanguageCode> = { en: 'EN', ar: 'AR', fi: 'FI' }

export function toWpLanguageCode(lang: Lang): WpLanguageCode {
  return WP_LANGUAGE_CODES[lang]
}
