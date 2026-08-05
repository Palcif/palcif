import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'

import logoUrl from '@/assets/design/logo-header.png'
import { DEFAULT_LANGUAGE, isSupportedLanguage, type Lang } from '@/i18n/languages'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { useDetailTranslations } from '@/shared/context/DetailTranslationsContext'

const LANGUAGE_SWITCHER_ORDER: Lang[] = ['fi', 'en', 'ar']

export default function Header() {
  const { t } = useTranslation()
  const { lang: langParam } = useParams<{ lang: string }>()
  const lang: Lang = isSupportedLanguage(langParam) ? langParam : DEFAULT_LANGUAGE
  const location = useLocation()
  const navigate = useNavigate()
  const translations = useDetailTranslations()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/events', label: t('nav.events'), end: false },
    { to: '/activities', label: t('nav.activities'), end: false },
    { to: '/blog', label: t('nav.blog'), end: false },
    { to: '/about', label: t('nav.about'), end: false },
    { to: '/contact', label: t('nav.contact'), end: false },
  ]

  const setLang = (target: Lang) => {
    if (target === lang) return
    const translated = translations?.find((entry) => entry.language === target)
    if (translated) {
      const section = location.pathname.split('/')[2] ?? ''
      navigate(`/${target}/${section}/${translated.slug}`)
      return
    }
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length >= 3) {
      navigate(`/${target}/${segments[1]}`)
      return
    }
    navigate(location.pathname.replace(/^\/[^/]+/, `/${target}`))
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-card">
        <LocalizedNavLink to="/" className="logo" aria-label={t('header.homeAriaLabel')}>
          <img src={logoUrl} alt={t('header.logoAlt')} className="logo-img" />
        </LocalizedNavLink>

        <nav className="main-nav" aria-label={t('header.mainNavAria')}>
          {navLinks.map(({ to, label, end }) => (
            <LocalizedNavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </LocalizedNavLink>
          ))}
        </nav>

        <div className="lang-switcher" aria-label={t('header.langSelectorAria')}>
          {LANGUAGE_SWITCHER_ORDER.map((l) => (
            <button
              key={l}
              className={`lang-btn${lang === l ? ' active' : ''}`}
              type="button"
              aria-current={lang === l ? true : undefined}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          className={`mobile-menu-btn${menuOpen ? ' open' : ''}`}
          type="button"
          aria-label={menuOpen ? t('header.menuCloseAria') : t('header.menuOpenAria')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav" aria-label={t('header.mobileNavAria')}>
          {navLinks.map(({ to, label, end }) => (
            <LocalizedNavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </LocalizedNavLink>
          ))}
        </nav>
        <div className="mobile-lang-switcher" aria-label={t('header.mobileLangSelectorAria')}>
          {LANGUAGE_SWITCHER_ORDER.map((l) => (
            <button
              key={l}
              className={`lang-btn${lang === l ? ' active' : ''}`}
              type="button"
              aria-current={lang === l ? true : undefined}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
