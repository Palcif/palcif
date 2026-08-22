import { Suspense, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation, useParams } from 'react-router'

import { TOP_LEVEL_SECTIONS } from '@/app/langRoutes'
import Footer from '@/features/newsletter/Footer'
import { DEFAULT_LANGUAGE, isSupportedLanguage, RTL_LANGUAGES } from '@/i18n/languages'
import BackToTopButton from '@/shared/components/BackToTopButton'
import Header from '@/shared/components/Header'
import ScrollToTop from '@/shared/components/ScrollToTop'
import { DetailTranslationsProvider } from '@/shared/context/DetailTranslationsContext'

export default function RootLayout() {
  const { t, i18n } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()

  useEffect(() => {
    if (isSupportedLanguage(lang) && i18n.language !== lang) {
      void i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  useLayoutEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'
  }, [i18n.language])

  if (!isSupportedLanguage(lang)) {
    // A prefix-less legacy link ("/activities/fun-day") and an invalid
    // `:lang` value ("/xx/activities") are structurally identical — both are
    // just path segments — so segment count alone can't tell them apart.
    // Content can: if the first segment is a real section name, there's no
    // language prefix at all and the whole path is the real destination; if
    // it isn't, treat it as a bogus lang value and only replace it.
    const target = TOP_LEVEL_SECTIONS.has(lang ?? '')
      ? `/${DEFAULT_LANGUAGE}${location.pathname}${location.search}${location.hash}`
      : location.pathname.replace(/^\/[^/]*/, `/${DEFAULT_LANGUAGE}`) +
        location.search +
        location.hash
    return <Navigate to={target} replace />
  }

  return (
    <DetailTranslationsProvider>
      <ScrollToTop />
      <div className="page">
        <a href="#main-content" className="skip-link">
          {t('common.skipToContent')}
        </a>
        <Header />
        <main id="main-content">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </DetailTranslationsProvider>
  )
}
