import { NavLink } from 'react-router'

import heroCollage from '@/assets/design/hero-collage-full.png'
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
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">Who we are</p>
          <h1 id="about-heading">About Us</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            A volunteer-led community rooted in Palestinian identity and open to everyone who shares
            our values of dignity, welcome, and belonging.
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
              <p>
                The Palestinian Community in Finland was founded by families, students, and
                professionals who wanted a place to gather, celebrate, and support one another far
                from home.
              </p>
              <p>
                Over the years, we have grown into a welcoming network that organises cultural
                events, advocacy gatherings, language circles, and social activities across
                Helsinki, Espoo, and beyond.
              </p>
              <p>
                Whether you are newly arrived, Finnish-born, or simply a friend of Palestine, you
                are welcome here.
              </p>
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
            <h2 id="join-heading">Be Part of Our Community</h2>
            <p>Join activities, attend events, or simply say hello. We would love to meet you.</p>
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
