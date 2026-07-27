import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import { ArrowRight, FloralOrnament, MapPin } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'

function formatEventDate(eventdate: string | null | undefined) {
  const date = eventdate ? new Date(eventdate) : null
  return {
    month: date ? date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : '',
    day: date ? date.toLocaleDateString('en-US', { day: '2-digit' }) : '',
    isoDate: date ? date.toISOString().slice(0, 10) : undefined,
  }
}

export default function Events() {
  const { data, isLoading, isError } = useEvents()
  const events = data?.events?.nodes ?? []
  const { upcoming, past } = splitEventsByDate(events)

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="events-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">Mark your calendar</p>
          <h1 id="events-heading">Events</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            Celebrate culture, learn new skills, and meet the community at our upcoming gatherings
            across Finland.
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {isLoading && (
        <section className="page-section" aria-label="Loading events">
          <div className="page-section-inner">
            <QueryLoading label="events" />
          </div>
        </section>
      )}

      {isError && (
        <section className="page-section" aria-label="Events error">
          <div className="page-section-inner">
            <QueryError label="events" />
          </div>
        </section>
      )}

      {!isLoading && !isError && events.length === 0 && (
        <section className="page-section" aria-label="No events">
          <div className="page-section-inner">
            <QueryEmpty label="events" />
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="page-section" aria-labelledby="upcoming-events-heading">
          <div className="page-section-inner">
            <h2 id="upcoming-events-heading" className="page-section-title">
              Upcoming Events
            </h2>

            <ul className="events-list-detailed">
              {upcoming.map((evt) => {
                const { month, day, isoDate } = formatEventDate(evt.eventsFields?.eventdate)
                return (
                  <li key={evt.id}>
                    <article className="event-card-detailed">
                      <time className="event-date-detailed" dateTime={isoDate}>
                        <span className="event-month">{month}</span>
                        <span className="event-day">{day}</span>
                      </time>
                      <div className="event-details">
                        <h3 dangerouslySetInnerHTML={{ __html: evt.title ?? '' }} />
                        <p
                          className="event-description"
                          dangerouslySetInnerHTML={{ __html: evt.content ?? '' }}
                        />
                        <div className="event-meta-row">
                          <span>{evt.eventsFields?.eventtime}</span>
                          <span className="event-meta-divider" aria-hidden="true" />
                          <span className="event-loc-row">
                            <MapPin /> {evt.eventsFields?.location}
                          </span>
                        </div>
                      </div>
                      <a href="#" className="event-card-link">
                        Details <ArrowRight />
                      </a>
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
                return (
                  <li key={evt.id}>
                    <article className="event-card-compact">
                      <time className="event-date-compact" dateTime={isoDate}>
                        <span className="event-month">{month}</span>
                        <span className="event-day">{day}</span>
                      </time>
                      <div className="event-info">
                        <h4 dangerouslySetInnerHTML={{ __html: evt.title ?? '' }} />
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
