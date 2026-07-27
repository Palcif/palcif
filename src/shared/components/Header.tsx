import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

import logoUrl from '@/assets/design/logo-header.png'

type Lang = 'FI' | 'EN' | 'AR'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'Events', end: false },
  { to: '/activities', label: 'Activities', end: false },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Header() {
  const [lang, setLang] = useState<Lang>('EN')
  const [menuOpen, setMenuOpen] = useState(false)

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
        <NavLink to="/" className="logo" aria-label="Palestinian Community in Finland — Home">
          <img src={logoUrl} alt="Palestinian Community in Finland" className="logo-img" />
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
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

        <div className="lang-switcher" aria-label="Language selector">
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
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
        <nav className="mobile-nav" aria-label="Mobile navigation">
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
        <div className="mobile-lang-switcher" aria-label="Mobile language selector">
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
