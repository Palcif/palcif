import { ArrowRight, FloralOrnament, MapPin } from '@/shared/components/icons'

const UPCOMING_EVENTS = [
  {
    month: 'MAY',
    day: '18',
    title: 'Nakba Remembrance Gathering',
    date: 'Sun, May 18, 2025 · 18:00',
    loc: 'Helsinki · Community Hall',
    dateTime: '2025-05-18',
    description:
      'An evening of remembrance, poetry, and music honouring Palestinian history and resilience.',
  },
  {
    month: 'JUN',
    day: '07',
    title: 'Palestinian Embroidery Workshop',
    date: 'Sat, Jun 7, 2025 · 13:00',
    loc: 'Espoo · Olohuone',
    dateTime: '2025-06-07',
    description:
      'Learn the basics of tatreez with experienced stitchers. Materials and light refreshments provided.',
  },
  {
    month: 'JUN',
    day: '21',
    title: 'Palestinian Film Evening',
    date: 'Sat, Jun 21, 2025 · 18:00',
    loc: 'Helsinki · Cinema Orion',
    dateTime: '2025-06-21',
    description:
      'A curated screening followed by a community discussion on storytelling and identity.',
  },
]

const PAST_EVENTS = [
  {
    month: 'APR',
    day: '12',
    title: 'Spring Family Picnic',
    date: 'Sat, Apr 12, 2025',
    loc: 'Helsinki · Kaivopuisto',
    dateTime: '2025-04-12',
  },
  {
    month: 'MAR',
    day: '22',
    title: 'Dabke Dance Workshop',
    date: 'Sat, Mar 22, 2025',
    loc: 'Helsinki · Suvilahti',
    dateTime: '2025-03-22',
  },
  {
    month: 'FEB',
    day: '08',
    title: 'Palestinian Cooking Class',
    date: 'Sat, Feb 8, 2025',
    loc: 'Espoo · Cultural Centre',
    dateTime: '2025-02-08',
  },
]

export default function Events() {
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

      {/* ── Upcoming Events ── */}
      <section className="page-section" aria-labelledby="upcoming-events-heading">
        <div className="page-section-inner">
          <h2 id="upcoming-events-heading" className="page-section-title">
            Upcoming Events
          </h2>

          <ul className="events-list-detailed">
            {UPCOMING_EVENTS.map((evt) => (
              <li key={evt.dateTime}>
                <article className="event-card-detailed">
                  <time className="event-date-detailed" dateTime={evt.dateTime}>
                    <span className="event-month">{evt.month}</span>
                    <span className="event-day">{evt.day}</span>
                  </time>
                  <div className="event-details">
                    <h3>{evt.title}</h3>
                    <p className="event-description">{evt.description}</p>
                    <div className="event-meta-row">
                      <span>{evt.date}</span>
                      <span className="event-meta-divider" aria-hidden="true" />
                      <span className="event-loc-row">
                        <MapPin /> {evt.loc}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="event-card-link">
                    Details <ArrowRight />
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Past Events ── */}
      <section className="page-section page-section-muted" aria-labelledby="past-events-heading">
        <div className="page-section-inner">
          <h2 id="past-events-heading" className="page-section-title">
            Past Events
          </h2>

          <ul className="events-list-compact">
            {PAST_EVENTS.map((evt) => (
              <li key={evt.dateTime}>
                <article className="event-card-compact">
                  <time className="event-date-compact" dateTime={evt.dateTime}>
                    <span className="event-month">{evt.month}</span>
                    <span className="event-day">{evt.day}</span>
                  </time>
                  <div className="event-info">
                    <h4>{evt.title}</h4>
                    <p className="event-meta">{evt.date}</p>
                    <p className="event-loc">{evt.loc}</p>
                  </div>
                  <ArrowRight className="event-arrow" />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
