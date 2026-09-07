import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import logoUrl from '@/assets/design/logo-header.png'
import { MenuLink } from '@/features/navigation/MenuLink'
import { useSiteMenus } from '@/features/navigation/useSiteMenus'
import { useSiteSettings } from '@/features/site-settings/useSiteSettings'
import {
  SocialEmail,
  SocialFacebook,
  SocialInstagram,
  SocialWhatsApp,
} from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { toSafeExternalUrl } from '@/shared/utils/url'

export default function Footer() {
  const { t } = useTranslation()
  const { data } = useSiteSettings()
  const { footerExplore: footerExploreItems, footerLegal: footerLegalItems } = useSiteMenus()
  const settings = data?.siteSettings?.siteSettingsFields
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      href: toSafeExternalUrl(settings?.socialFacebook),
      label: t('social.facebook'),
      icon: SocialFacebook,
    },
    {
      href: toSafeExternalUrl(settings?.socialInstagram),
      label: t('social.instagram'),
      icon: SocialInstagram,
    },
    {
      href: toSafeExternalUrl(settings?.socialWhatsapp),
      label: t('social.whatsapp'),
      icon: SocialWhatsApp,
    },
    {
      href: `mailto:${settings?.email ?? 'info@palcif.fi'}`,
      label: t('social.email'),
      icon: SocialEmail,
    },
  ]

  return (
    <footer className="site-footer" role="contentinfo" aria-label={t('footer.ariaLabel')}>
      <div className="footer-pattern" role="presentation" aria-hidden="true" />

      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <LocalizedNavLink to="/" className="footer-logo" aria-label={t('header.homeAriaLabel')}>
              <img src={logoUrl} alt={t('header.logoAlt')} width="80" height="60" />
            </LocalizedNavLink>
            <p className="footer-tagline">
              {settings?.footerTagline ??
                'Our roots. Our culture. Our community. From Palestine, with heart. In Finland.'}
            </p>
          </div>

          {footerExploreItems.length > 0 && (
            <div className="footer-nav-group">
              <h4 className="footer-heading">{t('footer.headingExplore')}</h4>
              <nav className="footer-nav" aria-label={t('footer.navAriaLabel')}>
                {footerExploreItems.map((menuItem) => (
                  <MenuLink key={menuItem.id} item={menuItem} className="footer-link" />
                ))}
              </nav>
            </div>
          )}

          <div className="footer-contact">
            <h4 className="footer-heading">{t('footer.headingConnect')}</h4>
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
          {footerLegalItems.length > 0 && (
            <div className="footer-legal">
              {footerLegalItems.map((menuItem, position) => (
                <Fragment key={menuItem.id}>
                  {position > 0 && <span className="footer-legal-divider" aria-hidden="true" />}
                  <MenuLink item={menuItem} className="footer-link" />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
