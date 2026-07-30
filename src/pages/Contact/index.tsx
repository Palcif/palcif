import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useContactPage } from '@/features/page-copy/useContactPage'
import { useSiteSettings } from '@/features/site-settings/useSiteSettings'
import {
  FloralOrnament,
  Mail,
  MapPin,
  Send,
  SocialEmail,
  SocialFacebook,
  SocialInstagram,
  SocialWhatsApp,
} from '@/shared/components/icons'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { toSafeExternalUrl } from '@/shared/utils/url'

export default function Contact() {
  const { t } = useTranslation()
  const { data: contactData, isLoading: contactLoading } = useContactPage()
  const { data: settingsData } = useSiteSettings()
  const settings = settingsData?.siteSettings?.siteSettingsFields

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
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="contact-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">{t('pages.contact.tagline')}</p>
          <h1 id="contact-heading">{t('pages.contact.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">{t('pages.contact.description')}</p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Contact Layout ── */}
      <section className="page-section" aria-label={t('pages.contact.formSectionAriaLabel')}>
        <div className="page-section-inner">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>{t('pages.contact.getInTouch')}</h2>
              <p>
                {contactLoading ? (
                  <SkeletonLines widths={['100%', '70%']} height={15} />
                ) : (
                  (contactData?.page?.contactFields?.contactIntro ??
                  'Whether you want to volunteer, partner with us, or learn more about our community, our team is here to help.')
                )}
              </p>

              <ul className="contact-methods">
                <li>
                  <a
                    href={`mailto:${settings?.email ?? 'info@palcif.fi'}`}
                    className="contact-method"
                  >
                    <span className="contact-method-icon">
                      <Mail />
                    </span>
                    <span>{settings?.email ?? 'info@palcif.fi'}</span>
                  </a>
                </li>
                <li>
                  <span className="contact-method">
                    <span className="contact-method-icon">
                      <MapPin />
                    </span>
                    <span>{settings?.address ?? 'Helsinki, Finland'}</span>
                  </span>
                </li>
              </ul>

              <div className="contact-social">
                <h3>{t('pages.contact.followUs')}</h3>
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

            {/* Contact Form */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <h3>
                    {t('pages.contact.successThanks', {
                      name: formState.name || t('pages.contact.successFallbackName'),
                    })}
                  </h3>
                  <p>{t('pages.contact.successBody')}</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setSubmitted(false)
                      setFormState({ name: '', email: '', subject: '', message: '' })
                    }}
                  >
                    {t('pages.contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="contact-form"
                  aria-label={t('pages.contact.formAriaLabel')}
                >
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">{t('pages.contact.nameLabel')}</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder={t('pages.contact.namePlaceholder')}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-email">{t('pages.contact.emailLabel')}</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder={t('pages.contact.emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject">{t('pages.contact.subjectLabel')}</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        {t('pages.contact.subjectPlaceholder')}
                      </option>
                      <option value="general">{t('pages.contact.subjectOptions.general')}</option>
                      <option value="events">{t('pages.contact.subjectOptions.events')}</option>
                      <option value="volunteer">
                        {t('pages.contact.subjectOptions.volunteer')}
                      </option>
                      <option value="partnership">
                        {t('pages.contact.subjectOptions.partnership')}
                      </option>
                      <option value="other">{t('pages.contact.subjectOptions.other')}</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">{t('pages.contact.messageLabel')}</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={t('pages.contact.messagePlaceholder')}
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-full">
                    {t('pages.contact.send')}
                    <Send className="btn-icon" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
