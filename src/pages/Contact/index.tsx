import { useState } from 'react'

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

const socialLinks = [
  { href: 'https://www.facebook.com/palcif', label: 'Facebook', icon: SocialFacebook },
  { href: 'https://www.instagram.com/palcif', label: 'Instagram', icon: SocialInstagram },
  { href: 'https://wa.me/358401234567', label: 'WhatsApp', icon: SocialWhatsApp },
  { href: 'mailto:info@palcif.fi', label: 'Email', icon: SocialEmail },
]

export default function Contact() {
  const { data: contactData } = useContactPage()
  const { data: settingsData } = useSiteSettings()
  const settings = settingsData?.siteSettings?.siteSettingsFields
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
          <p className="page-hero-tagline">We would love to hear from you</p>
          <h1 id="contact-heading">Contact</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            Questions, ideas, or just want to say hello? Reach out and we will get back to you as
            soon as we can.
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Contact Layout ── */}
      <section className="page-section" aria-label="Contact information and form">
        <div className="page-section-inner">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                {contactData?.page?.contactFields?.contactIntro ??
                  'Whether you want to volunteer, partner with us, or learn more about our community, our team is here to help.'}
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
                <h3>Follow Us</h3>
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
                  <h3>Thank you, {formState.name || 'friend'}!</h3>
                  <p>Your message has been sent. We will be in touch soon.</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setSubmitted(false)
                      setFormState({ name: '', email: '', subject: '', message: '' })
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="general">General question</option>
                      <option value="events">Events & activities</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-full">
                    Send Message
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
