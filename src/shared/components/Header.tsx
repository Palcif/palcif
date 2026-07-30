import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import logoUrl from '@/assets/design/logo-header.png'

type Lang = 'FI' | 'EN' | 'AR'

const LANG_TO_I18N: Record<Lang, string> = { FI: 'fi', EN: 'en', AR: 'ar' }
const I18N_TO_LANG: Record<string, Lang> = { fi: 'FI', en: 'EN', ar: 'AR' }

export default function Header() {
  const { t, i18n } = useTranslation()
  const lang = I18N_TO_LANG[i18n.language] ?? 'EN'
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/events', label: t('nav.events'), end: false },
    { to: '/activities', label: t('nav.activities'), end: false },
    { to: '/blog', label: t('nav.blog'), end: false },
    { to: '/about', label: t('nav.about'), end: false },
    { to: '/contact', label: t('nav.contact'), end: false },
  ]

  const setLang = (l: Lang) => {
    void i18n.changeLanguage(LANG_TO_I18N[l])
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
        <NavLink to="/" className="logo" aria-label={t('header.homeAriaLabel')}>
          <img src={logoUrl} alt={t('header.logoAlt')} className="logo-img" />
        </NavLink>

        <nav className="main-nav" aria-label={t('header.mainNavAria')}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="lang-switcher" aria-label={t('header.langSelectorAria')}>
          {(['FI', 'EN', 'AR'] as Lang[]).map((l) => (
            <button
              key={l}
              className={`lang-btn${lang === l ? ' active' : ''}`}
              type="button"
              aria-current={lang === l ? true : undefined}
              onClick={() => setLang(l)}
            >
              {l}
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
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-lang-switcher" aria-label={t('header.mobileLangSelectorAria')}>
          {(['FI', 'EN', 'AR'] as Lang[]).map((l) => (
            <button
              key={l}
              className={`lang-btn${lang === l ? ' active' : ''}`}
              type="button"
              aria-current={lang === l ? true : undefined}
              onClick={() => setLang(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
