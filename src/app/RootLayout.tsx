import { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation, useParams } from 'react-router'

import Footer from '@/features/newsletter/Footer'
import { DEFAULT_LANGUAGE, isSupportedLanguage, RTL_LANGUAGES } from '@/i18n/languages'
import Header from '@/shared/components/Header'
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

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'
  }, [i18n.language])

  if (!isSupportedLanguage(lang)) {
    return <Navigate to={location.pathname.replace(/^\/[^/]*/, `/${DEFAULT_LANGUAGE}`)} replace />
  }

  return (
    <DetailTranslationsProvider>
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
      </div>
    </DetailTranslationsProvider>
  )
}
