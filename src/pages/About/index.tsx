import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import heroCollage from '@/assets/design/hero-collage-full.png'
import { useAboutPage } from '@/features/page-copy/useAboutPage'
import { BookOpen, FloralOrnament, Heart, Users } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useAboutPage()
  const about = data?.page?.aboutFields

  const VALUES = [
    {
      icon: Users,
      title: t('pages.about.values.community.title'),
      description: t('pages.about.values.community.description'),
    },
    {
      icon: Heart,
      title: t('pages.about.values.culture.title'),
      description: t('pages.about.values.culture.description'),
    },
    {
      icon: BookOpen,
      title: t('pages.about.values.learning.title'),
      description: t('pages.about.values.learning.description'),
    },
  ]

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">
            {isLoading ? (
              <Skeleton width={100} height={14} />
            ) : (
              (about?.heroTagline ?? 'Who we are')
            )}
          </p>
          <h1 id="about-heading">
            {isLoading ? <Skeleton width="60%" height={34} /> : (about?.heroHeading ?? 'About Us')}
          </h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            {isLoading ? (
              <SkeletonLines widths={['90%', '70%']} height={15} />
            ) : (
              (about?.heroDescription ??
              'A volunteer-led community rooted in Palestinian identity and open to everyone who shares our values of dignity, welcome, and belonging.')
            )}
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Story Section ── */}
      <section className="page-section" aria-labelledby="our-story-heading">
        <div className="page-section-inner">
          <div className="about-split">
            <div className="about-split-image">
              <img src={heroCollage} alt={t('pages.about.imageAlt')} loading="lazy" />
            </div>
            <div className="about-split-body">
              <h2 id="our-story-heading">{t('pages.about.storyHeading')}</h2>
              {isLoading ? (
                <SkeletonLines widths={['100%', '100%', '80%', '90%']} height={15} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(about?.storyBody) }} />
              )}
              <NavLink to="/contact" className="btn-primary">
                {t('pages.about.getInTouch')}
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="page-section page-section-muted" aria-labelledby="values-heading">
        <div className="page-section-inner">
          <h2 id="values-heading" className="page-section-title">
            {t('pages.about.valuesHeading')}
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
            <h2 id="join-heading">
              {isLoading ? (
                <Skeleton width="55%" height={28} />
              ) : (
                (about?.joinHeading ?? 'Be Part of Our Community')
              )}
            </h2>
            <p>
              {isLoading ? (
                <SkeletonLines widths={['100%', '60%']} height={15} />
              ) : (
                (about?.joinDescription ??
                'Join activities, attend events, or simply say hello. We would love to meet you.')
              )}
            </p>
            <div className="join-cta-actions">
              <NavLink to="/events" className="btn-primary">
                {t('pages.about.exploreEvents')}
              </NavLink>
              <NavLink to="/contact" className="btn-text">
                {t('pages.about.contactUs')}
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
