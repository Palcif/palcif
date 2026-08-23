import { useTranslation } from 'react-i18next'

import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import { ArrowRight, FloralOrnament, MapPin } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { formatEventDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Events() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useEvents()
  const events = data?.events?.nodes ?? []
  const { upcoming, past } = splitEventsByDate(events)

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="events-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">{t('pages.events.tagline')}</p>
          <h1 id="events-heading">{t('pages.events.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">{t('pages.events.description')}</p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {isLoading && (
        <section
          className="page-section"
          role="status"
          aria-live="polite"
          aria-label={t('pages.events.loadingAriaLabel')}
        >
          <div className="page-section-inner">
            <ul className="events-list-detailed">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <article className="event-card-detailed" aria-hidden="true">
                    <div className="event-date-detailed">
                      <Skeleton width={32} height={32} />
                    </div>
                    <div className="event-details">
                      <Skeleton width="70%" height={22} className="skeleton-line" />
                      <SkeletonLines widths={['100%', '85%']} height={14} />
                      <Skeleton width="40%" height={13} className="skeleton-line" />
                    </div>
                    <Skeleton width={110} height={38} radius="md" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {isError && (
        <section className="page-section" aria-label={t('pages.events.errorAriaLabel')}>
          <div className="page-section-inner">
            <QueryError label={t('nouns.events')} />
          </div>
        </section>
      )}

      {!isLoading && !isError && events.length === 0 && (
        <section className="page-section" aria-label={t('pages.events.emptyAriaLabel')}>
          <div className="page-section-inner">
            <QueryEmpty label={t('nouns.events')} />
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="page-section" aria-labelledby="upcoming-events-heading">
          <div className="page-section-inner">
            <h2 id="upcoming-events-heading" className="page-section-title">
              {t('pages.events.upcomingHeading')}
            </h2>

            <ul className="events-list-detailed">
              {upcoming.map((evt) => {
                const { month, day, isoDate } = formatEventDate(evt.eventsFields?.eventdate)
                const imageUrl = evt.featuredImage?.node.sourceUrl
                const imageAlt = evt.featuredImage?.node.altText ?? ''
                return (
                  <li key={evt.id}>
                    <article className="event-card-detailed">
                      {imageUrl && (
                        <div className="event-card-image">
                          <img src={imageUrl} alt={imageAlt} loading="lazy" />
                        </div>
                      )}
                      {isoDate && (
                        <time className="event-date-detailed" dateTime={isoDate}>
                          <span className="event-month">{month}</span>
                          <span className="event-day">{day}</span>
                        </time>
                      )}
                      <div className="event-details">
                        <h3 dangerouslySetInnerHTML={{ __html: sanitizeHtml(evt.title) }} />
                        <p
                          className="event-description"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(evt.content) }}
                        />
                        <div className="event-meta-row">
                          <span>{evt.eventsFields?.eventtime}</span>
                          <span className="event-meta-divider" aria-hidden="true" />
                          <span className="event-loc-row">
                            <MapPin /> {evt.eventsFields?.location}
                          </span>
                        </div>
                      </div>
                      <LocalizedNavLink to={`/events/${evt.slug}`} className="event-card-link">
                        {t('pages.events.details')} <ArrowRight />
                      </LocalizedNavLink>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="page-section page-section-muted" aria-labelledby="past-events-heading">
          <div className="page-section-inner">
            <h2 id="past-events-heading" className="page-section-title">
              Past Events
            </h2>

            <ul className="events-list-compact">
              {past.map((evt) => {
                const { month, day, isoDate } = formatEventDate(evt.eventsFields?.eventdate)
                const imageUrl = evt.featuredImage?.node.sourceUrl
                const imageAlt = evt.featuredImage?.node.altText ?? ''
                return (
                  <li key={evt.id}>
                    <article className="event-card-compact">
                      {imageUrl && (
                        <div className="event-card-thumb">
                          <img src={imageUrl} alt={imageAlt} loading="lazy" />
                        </div>
                      )}
                      {isoDate && (
                        <time className="event-date-compact" dateTime={isoDate}>
                          <span className="event-month">{month}</span>
                          <span className="event-day">{day}</span>
                        </time>
                      )}
                      <div className="event-info">
                        <h4 dangerouslySetInnerHTML={{ __html: sanitizeHtml(evt.title) }} />
                        <p className="event-loc">{evt.eventsFields?.location}</p>
                      </div>
                      <ArrowRight className="event-arrow" />
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
