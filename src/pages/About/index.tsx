import { NavLink } from 'react-router'

import heroCollage from '@/assets/design/hero-collage-full.png'
import { useAboutPage } from '@/features/page-copy/useAboutPage'
import { BookOpen, FloralOrnament, Heart, Users } from '@/shared/components/icons'

const VALUES = [
  {
    icon: Users,
    title: 'Community First',
    description:
      'We create space for Palestinians in Finland to meet, support one another, and feel at home.',
  },
  {
    icon: Heart,
    title: 'Culture & Heritage',
    description:
      'From dabke to tatreez, we keep Palestinian traditions alive and pass them to the next generation.',
  },
  {
    icon: BookOpen,
    title: 'Learning & Dialogue',
    description:
      'We host language circles, film nights, and discussions that inform, inspire, and connect.',
  },
]

export default function About() {
  const { data } = useAboutPage()
  const about = data?.page?.aboutFields

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">{about?.heroTagline ?? 'Who we are'}</p>
          <h1 id="about-heading">{about?.heroHeading ?? 'About Us'}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            {about?.heroDescription ??
              'A volunteer-led community rooted in Palestinian identity and open to everyone who shares our values of dignity, welcome, and belonging.'}
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Story Section ── */}
      <section className="page-section" aria-labelledby="our-story-heading">
        <div className="page-section-inner">
          <div className="about-split">
            <div className="about-split-image">
              <img
                src={heroCollage}
                alt="Collage of Helsinki landmarks, community gatherings, and Palestinian heritage symbols"
                loading="lazy"
              />
            </div>
            <div className="about-split-body">
              <h2 id="our-story-heading">Our Story</h2>
              <div dangerouslySetInnerHTML={{ __html: about?.storyBody ?? '' }} />
              <NavLink to="/contact" className="btn-primary">
                Get in Touch
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="page-section page-section-muted" aria-labelledby="values-heading">
        <div className="page-section-inner">
          <h2 id="values-heading" className="page-section-title">
            What We Stand For
          </h2>

          <ul className="value-grid">
            {VALUES.map((value) => (
              <li key={value.title}>
                <div className="value-card">
                  <div className="value-icon">
                    <value.icon />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="page-section" aria-labelledby="join-heading">
        <div className="page-section-inner">
          <div className="join-cta">
            <h2 id="join-heading">{about?.joinHeading ?? 'Be Part of Our Community'}</h2>
            <p>
              {about?.joinDescription ??
                'Join activities, attend events, or simply say hello. We would love to meet you.'}
            </p>
            <div className="join-cta-actions">
              <NavLink to="/events" className="btn-primary">
                Explore Events
              </NavLink>
              <NavLink to="/contact" className="btn-text">
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
