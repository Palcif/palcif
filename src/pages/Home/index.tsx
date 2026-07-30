import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import heroCollage from '@/assets/design/hero-collage-full.png'
import oliveSprig from '@/assets/design/olive-sprig-left.png'
import { useActivities } from '@/features/activities/useActivities'
import { useBlogPosts } from '@/features/blog/useBlogPosts'
import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import CulturalHighlights from '@/features/highlights/CulturalHighlights'
import { useHomePage } from '@/features/page-copy/useHomePage'
import { ArrowRight, FloralOrnament, OliveBranch } from '@/shared/components/icons'
import SectionHeader from '@/shared/components/SectionHeader'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { formatDisplayDate, formatEventDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Home() {
  const { t } = useTranslation()
  const { data: eventsData, isLoading: eventsLoading } = useEvents()
  const upcomingEvents = splitEventsByDate(eventsData?.events?.nodes ?? []).upcoming.slice(0, 3)
  const { data: activitiesData, isLoading: activitiesLoading } = useActivities()
  const latestActivities = (activitiesData?.activities?.nodes ?? []).slice(0, 3)
  const { data: blogData, isLoading: blogLoading } = useBlogPosts()
  const latestPosts = (blogData?.posts?.nodes ?? []).slice(0, 3)
  const { data: homeData, isLoading: homeLoading } = useHomePage()
  const home = homeData?.page?.homeFields

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-grid">
          <div className="hero-left">
            <img
              src={oliveSprig}
              alt=""
              className="hero-olive"
              aria-hidden="true"
              width="88"
              height="340"
            />
            <p className="hero-tagline">
              {homeLoading ? <Skeleton width={140} height={14} /> : (home?.heroTagline ?? '')}
            </p>
            {homeLoading ? (
              <h1 id="hero-heading">
                <Skeleton width="90%" height={38} className="skeleton-line" />
                <Skeleton width="65%" height={38} className="skeleton-line" />
              </h1>
            ) : (
              <h1
                id="hero-heading"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(home?.heroHeading ?? ''),
                }}
              />
            )}

            <div className="hero-divider">
              <span className="hero-divider-line" />
              <span className="hero-divider-ornament">
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
              </span>
              <span className="hero-divider-line" />
            </div>

            <p className="hero-description">
              {homeLoading ? (
                <SkeletonLines widths={['100%', '80%']} height={15} />
              ) : (
                (home?.heroDescription ?? '')
              )}
            </p>
            <div className="hero-actions">
              <NavLink to="/about" className="btn-primary">
                {t('home.ctaJoin')}
                <OliveBranch className="btn-icon" />
              </NavLink>
              <NavLink to="/events" className="btn-text">
                {t('home.ctaEvents')} <ArrowRight />
              </NavLink>
            </div>
          </div>

          <div className="hero-right">
            <img
              src={heroCollage}
              alt={t('home.heroImageAlt')}
              className="hero-right-img"
              loading="eager"
              width="1280"
              height="980"
            />
          </div>
        </div>
      </section>

      {/* ── Tatreez Divider ── */}
      <div className="tatreez-divider" role="presentation" />

      {/* ── Content Grid ── */}
      <section className="content-grid" aria-label={t('home.updatesAriaLabel')}>
        {/* Upcoming Events */}
        <div className="content-column">
          <SectionHeader
            title={t('home.upcomingEvents')}
            action={t('home.viewAllEvents')}
            to="/events"
          />
          <ul className="event-list">
            {eventsLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <li key={index}>
                    <div className="event-card" aria-hidden="true">
                      <div className="event-date">
                        <Skeleton width={24} height={24} />
                      </div>
                      <div className="event-info">
                        <Skeleton width="90%" height={15} className="skeleton-line" />
                        <SkeletonLines widths={['50%', '65%']} height={12} />
                      </div>
                    </div>
                  </li>
                ))
              : upcomingEvents.map((evt) => {
                  const { month, day, isoDate } = formatEventDate(evt.eventsFields?.eventdate)
                  return (
                    <li key={evt.id}>
                      <article>
                        <NavLink to="/events" className="event-card">
                          <time className="event-date" dateTime={isoDate}>
                            <span className="event-month">{month}</span>
                            <span className="event-day">{day}</span>
                          </time>
                          <div className="event-info">
                            <h4
                              className="line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: sanitizeHtml(evt.title) }}
                            />
                            <p className="event-meta">{evt.eventsFields?.eventtime}</p>
                            <p className="event-loc">{evt.eventsFields?.location}</p>
                          </div>
                          <ArrowRight className="event-arrow" />
                        </NavLink>
                      </article>
                    </li>
                  )
                })}
          </ul>
        </div>

        {/* Latest Activities */}
        <div className="content-column">
          <SectionHeader
            title={t('home.latestActivities')}
            action={t('home.viewAllActivities')}
            to="/activities"
          />
          <ul className="article-list">
            {activitiesLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <li key={index}>
                    <div className="article-card" aria-hidden="true">
                      <div className="article-thumb">
                        <Skeleton className="skeleton-fill" />
                      </div>
                      <div className="article-info">
                        <Skeleton width="85%" height={14} className="skeleton-line" />
                        <Skeleton width={70} height={11} />
                      </div>
                    </div>
                  </li>
                ))
              : latestActivities.map((item) => (
                  <li key={item.id}>
                    <article>
                      <NavLink to="/activities" className="article-card">
                        <div className="article-thumb">
                          <img
                            src={item.featuredImage?.node.sourceUrl ?? undefined}
                            alt={item.featuredImage?.node.altText ?? ''}
                          />
                        </div>
                        <div className="article-info">
                          <h4
                            className="line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                          />
                          <time dateTime={item.date ?? ''}>{formatDisplayDate(item.date)}</time>
                        </div>
                      </NavLink>
                    </article>
                  </li>
                ))}
          </ul>
        </div>

        {/* From the Blog */}
        <div className="content-column">
          <SectionHeader title={t('home.fromBlog')} action={t('home.viewAllPosts')} to="/blog" />
          <ul className="article-list">
            {blogLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <li key={index}>
                    <div className="article-card" aria-hidden="true">
                      <div className="article-thumb">
                        <Skeleton className="skeleton-fill" />
                      </div>
                      <div className="article-info">
                        <Skeleton width="85%" height={14} className="skeleton-line" />
                        <Skeleton width={70} height={11} />
                      </div>
                    </div>
                  </li>
                ))
              : latestPosts.map((post) => (
                  <li key={post.id}>
                    <article>
                      <NavLink to="/blog" className="article-card">
                        <div className="article-thumb">
                          <img
                            src={post.featuredImage?.node.sourceUrl ?? undefined}
                            alt={post.featuredImage?.node.altText ?? ''}
                          />
                        </div>
                        <div className="article-info">
                          <h4
                            className="line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title) }}
                          />
                          <time dateTime={post.date ?? ''}>{formatDisplayDate(post.date)}</time>
                        </div>
                      </NavLink>
                    </article>
                  </li>
                ))}
          </ul>
        </div>
      </section>

      {/* ── Cultural Highlights ── */}
      <CulturalHighlights />
    </>
  )
}
