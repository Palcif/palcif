import { useTranslation } from 'react-i18next'

import { CollapsibleEventDescription } from '@/features/events/CollapsibleEventDescription'
import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import type { EventsQuery } from '@/graphql/generated/graphql'
import { ArrowRight, FloralOrnament, MapPin } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { ZoomableImage } from '@/shared/components/ZoomableImage'
import { formatEventDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

type EventNode = NonNullable<EventsQuery['events']>['nodes'][number]

/** A single event card, shared by the upcoming and past events lists. */
function EventListCard({ event }: { event: EventNode }) {
  const { t } = useTranslation()
  const { month, day, isoDate } = formatEventDate(event.eventsFields?.eventdate)
  const imageUrl = event.featuredImage?.node.sourceUrl
  const imageAlt = event.featuredImage?.node.altText ?? ''

  return (
    <article className="event-card">
      <div className="event-card-thumb">
        <ZoomableImage src={imageUrl} alt={imageAlt} />
      </div>
      <div className="event-details">
        <div className="event-card-meta">
          {isoDate && (
            <time className="event-date-chip" dateTime={isoDate}>
              {month} {day}
            </time>
          )}
          {event.eventsFields?.eventtime && <span>{event.eventsFields.eventtime}</span>}
          {event.eventsFields?.location && (
            <span className="event-loc-row">
              <MapPin /> {event.eventsFields.location}
            </span>
          )}
        </div>
        <h3 dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.title) }} />
        <CollapsibleEventDescription contentHtml={event.content} />
        <LocalizedNavLink to={`/events/${event.slug}`} className="event-card-link">
          {t('pages.events.details')} <ArrowRight />
        </LocalizedNavLink>
      </div>
    </article>
  )
}

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
            <ul className="events-list">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <article className="event-card" aria-hidden="true">
                    <div className="event-card-thumb">
                      <Skeleton className="skeleton-fill" />
                    </div>
                    <div className="event-details">
                      <div className="event-card-meta">
                        <Skeleton width={70} height={20} radius="md" />
                        <Skeleton width={90} height={13} />
                      </div>
                      <Skeleton width="75%" height={24} className="skeleton-line" />
                      <Skeleton width="100%" height={14} className="skeleton-line" />
                      <Skeleton width="60%" height={14} className="skeleton-line" />
                    </div>
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

            <ul className="events-list">
              {upcoming.map((evt) => (
                <li key={evt.id}>
                  <EventListCard event={evt} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="page-section page-section-muted" aria-labelledby="past-events-heading">
          <div className="page-section-inner">
            <h2 id="past-events-heading" className="page-section-title">
              {t('pages.events.pastHeading')}
            </h2>

            <ul className="events-list">
              {past.map((evt) => (
                <li key={evt.id}>
                  <EventListCard event={evt} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
