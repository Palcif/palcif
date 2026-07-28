import { NavLink } from 'react-router'

import logoUrl from '@/assets/design/logo-header.png'
import { useSiteSettings } from '@/features/site-settings/useSiteSettings'
import {
  SocialEmail,
  SocialFacebook,
  SocialInstagram,
  SocialWhatsApp,
} from '@/shared/components/icons'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'Events', end: false },
  { to: '/activities', label: 'Activities', end: false },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Footer() {
  const { data } = useSiteSettings()
  const settings = data?.siteSettings?.siteSettingsFields
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { href: settings?.socialFacebook ?? '#', label: 'Facebook', icon: SocialFacebook },
    { href: settings?.socialInstagram ?? '#', label: 'Instagram', icon: SocialInstagram },
    { href: settings?.socialWhatsapp ?? '#', label: 'WhatsApp', icon: SocialWhatsApp },
    { href: `mailto:${settings?.email ?? 'info@palcif.fi'}`, label: 'Email', icon: SocialEmail },
  ]

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-pattern" role="presentation" aria-hidden="true" />

      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <NavLink
              to="/"
              className="footer-logo"
              aria-label="Palestinian Community in Finland — Home"
            >
              <img src={logoUrl} alt="Palestinian Community in Finland" width="80" height="60" />
            </NavLink>
            <p className="footer-tagline">
              {settings?.footerTagline ??
                'Our roots. Our culture. Our community. From Palestine, with heart. In Finland.'}
            </p>
          </div>

          <div className="footer-nav-group">
            <h4 className="footer-heading">Explore</h4>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) => `footer-link${isActive ? ' active' : ''}`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Connect</h4>
            <address className="footer-address">
              <p>{settings?.orgName ?? 'Palestinian Community in Finland ry'}</p>
              <p>{settings?.address ?? 'Helsinki, Finland'}</p>
              <p>
                <a href={`mailto:${settings?.email ?? 'info@palcif.fi'}`}>
                  {settings?.email ?? 'info@palcif.fi'}
                </a>
              </p>
            </address>
            <div className="footer-social">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social-link"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {settings?.copyrightLine ??
              `© ${currentYear} Palestinian Community in Finland. All rights reserved.`}
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <span className="footer-legal-divider" aria-hidden="true" />
            <a href="#" className="footer-link">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
