import { NavLink, useParams } from 'react-router'

import { useEventDetail } from '@/features/events/useEventDetail'
import { ChevronLeft, MapPin } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useEventDetail(slug ?? '')
  const event = data?.event

  return (
    <section className="page-section" aria-labelledby="event-heading">
      <div className="page-section-inner">
        <NavLink to="/events" className="event-card-link">
          <ChevronLeft /> Back to Events
        </NavLink>

        {isLoading && <QueryLoading label="event" />}
        {isError && <QueryError label="event" />}
        {!isLoading && !isError && !event && <QueryEmpty label="event" />}

        {event && (
          <article className="event-card-detailed">
            <div className="event-details">
              <h1
                id="event-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.title) }}
              />
              <div className="event-meta-row">
                <span>
                  {event.eventsFields?.eventdate
                    ? new Date(event.eventsFields.eventdate).toLocaleDateString()
                    : ''}
                </span>
                <span className="event-meta-divider" aria-hidden="true" />
                <span>{event.eventsFields?.eventtime}</span>
                <span className="event-meta-divider" aria-hidden="true" />
                <span className="event-loc-row">
                  <MapPin /> {event.eventsFields?.location}
                </span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.content) }} />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
