import { useTranslation } from 'react-i18next'

import heroCollage from '@/assets/design/hero-collage-full.png'
import oliveSprig from '@/assets/design/olive-sprig-left.png'
import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import CulturalHighlights from '@/features/highlights/CulturalHighlights'
import { usePage } from '@/features/pages/usePage'
import { useSectionPosts } from '@/features/posts/useSectionPosts'
import { ArrowRight, FloralOrnament, OliveBranch } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import SectionHeader from '@/shared/components/SectionHeader'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { formatDisplayDate, formatEventDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Home() {
  const { t } = useTranslation()
  const { data: eventsData, isLoading: eventsLoading } = useEvents()
  const upcomingEvents = splitEventsByDate(eventsData?.events?.nodes ?? []).upcoming.slice(0, 6)
  const { data: activitiesData, isLoading: activitiesLoading } = useSectionPosts('activities')
  const latestActivities = (activitiesData?.posts?.nodes ?? []).slice(0, 3)
  const { data: blogData, isLoading: blogLoading } = useSectionPosts('blog')
  const latestPosts = (blogData?.posts?.nodes ?? []).slice(0, 3)
  const { data: homeData, isLoading: homeLoading } = usePage('home')
  const home = homeData?.pages?.nodes[0]

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
            {homeLoading ? (
              <div className="hero-copy-skeleton" aria-hidden="true">
                <Skeleton width={140} height={14} />
                <Skeleton width="90%" height={38} className="skeleton-line" />
                <Skeleton width="65%" height={38} className="skeleton-line" />
                <SkeletonLines widths={['100%', '80%']} height={15} />
              </div>
            ) : (
              <div
                id="hero-heading"
                className="page-content hero-copy"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(home?.content) }}
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

            <div className="hero-actions">
              <LocalizedNavLink to="/about" className="btn-primary">
                {t('home.ctaJoin')}
                <OliveBranch className="btn-icon" />
              </LocalizedNavLink>
              <LocalizedNavLink to="/events" className="btn-text">
                {t('home.ctaEvents')} <ArrowRight />
              </LocalizedNavLink>
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
                      <LocalizedNavLink to="/activities" className="article-card">
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
                      </LocalizedNavLink>
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
                      <LocalizedNavLink to="/blog" className="article-card">
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
                      </LocalizedNavLink>
                    </article>
                  </li>
                ))}
          </ul>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="home-events-section" aria-labelledby="home-events-heading">
        <div className="home-events-container">
          <header className="home-events-header">
            <div className="home-events-title-group">
              <h2 id="home-events-heading">{t('home.upcomingEvents')}</h2>
              <p>{t('home.upcomingEventsSubtitle')}</p>
            </div>
            <LocalizedNavLink to="/events" className="home-events-view-all">
              {t('home.viewAllEvents')}
              <ArrowRight />
            </LocalizedNavLink>
          </header>

          {eventsLoading ? (
            <ul className="home-events-grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => (
                <li key={index}>
                  <div className="event-card-tile">
                    <Skeleton className="skeleton-fill" />
                  </div>
                </li>
              ))}
            </ul>
          ) : upcomingEvents.length > 0 ? (
            <ul className="home-events-grid">
              {upcomingEvents.map((evt) => {
                const { month, day, isoDate } = formatEventDate(evt.eventsFields?.eventdate)
                const imgUrl = evt.featuredImage?.node.sourceUrl
                const imgAlt = evt.featuredImage?.node.altText ?? ''
                const eventTime = evt.eventsFields?.eventtime?.trim()
                const eventLocation = evt.eventsFields?.location?.trim()
                const hasOverlayContent = Boolean(eventTime || eventLocation || isoDate)
                return (
                  <li key={evt.id}>
                    <article>
                      <LocalizedNavLink to={`/events/${evt.slug}`} className="event-card-tile">
                        {imgUrl && (
                          <img
                            src={imgUrl}
                            alt={imgAlt}
                            className="event-tile-background-image"
                            loading="lazy"
                          />
                        )}
                        {hasOverlayContent && (
                          <div className="event-tile-overlay">
                            {isoDate && (
                              <time className="event-tile-date" dateTime={isoDate}>
                                <span className="event-tile-month">{month}</span>
                                <span className="event-tile-day">{day}</span>
                              </time>
                            )}
                            {(eventTime || eventLocation) && (
                              <p className="event-tile-meta-line">
                                {[eventTime, eventLocation].filter(Boolean).join(' · ')}
                              </p>
                            )}
                          </div>
                        )}
                      </LocalizedNavLink>
                    </article>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="event-empty">{t('pages.events.noUpcomingEvents')}</p>
          )}
        </div>
      </section>

      {/* ── Cultural Highlights ── */}
      <CulturalHighlights />
    </>
  )
}
