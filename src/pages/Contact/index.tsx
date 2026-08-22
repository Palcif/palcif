import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { usePage } from '@/features/pages/usePage'
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
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'
import { toSafeExternalUrl } from '@/shared/utils/url'

import { contactFormResolver, type ContactFormValues } from './contactFormSchema'

export default function Contact() {
  const { t } = useTranslation()
  const { data: contactData, isLoading: contactLoading } = usePage('contact')
  const contactPage = contactData?.pages?.nodes[0]
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: contactFormResolver,
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })
  const [submitOutcome, setSubmitOutcome] = useState<'idle' | 'success' | 'error'>('idle')
  const [submittedName, setSubmittedName] = useState('')

  const onSubmit = handleSubmit(async (values) => {
    const formspreeId = import.meta.env['VITE_FORMSPREE_ID'] as string | undefined
    if (!formspreeId) {
      setSubmitOutcome('error')
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Formspree submission failed')
      setSubmittedName(values.name)
      setSubmitOutcome('success')
      reset()
    } catch {
      setSubmitOutcome('error')
    }
  })

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
              {contactLoading ? (
                <SkeletonLines widths={['100%', '70%']} height={15} />
              ) : (
                <div
                  className="page-content"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(contactPage?.content) }}
                />
              )}

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
              {submitOutcome === 'success' ? (
                <div className="contact-success">
                  <h3>
                    {t('pages.contact.successThanks', {
                      name: submittedName || t('pages.contact.successFallbackName'),
                    })}
                  </h3>
                  <p>{t('pages.contact.successBody')}</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setSubmitOutcome('idle')}
                  >
                    {t('pages.contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="contact-form"
                  aria-label={t('pages.contact.formAriaLabel')}
                  noValidate
                >
                  {submitOutcome === 'error' && (
                    <p className="form-error" role="alert">
                      {t('pages.contact.sendError')}
                    </p>
                  )}

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">{t('pages.contact.nameLabel')}</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder={t('pages.contact.namePlaceholder')}
                        aria-invalid={errors.name ? true : undefined}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="form-field-error">
                          {t(`pages.contact.${errors.name.message}`)}
                        </p>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-email">{t('pages.contact.emailLabel')}</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder={t('pages.contact.emailPlaceholder')}
                        aria-invalid={errors.email ? true : undefined}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="form-field-error">
                          {t(`pages.contact.${errors.email.message}`)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject">{t('pages.contact.subjectLabel')}</label>
                    <select
                      id="contact-subject"
                      defaultValue=""
                      aria-invalid={errors.subject ? true : undefined}
                      {...register('subject')}
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
                    {errors.subject && (
                      <p className="form-field-error">
                        {t(`pages.contact.${errors.subject.message}`)}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">{t('pages.contact.messageLabel')}</label>
                    <textarea
                      id="contact-message"
                      placeholder={t('pages.contact.messagePlaceholder')}
                      rows={5}
                      aria-invalid={errors.message ? true : undefined}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="form-field-error">
                        {t(`pages.contact.${errors.message.message}`)}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary btn-full" disabled={isSubmitting}>
                    {isSubmitting ? t('pages.contact.sending') : t('pages.contact.send')}
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
