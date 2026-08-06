import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { useEventDetail } from '@/features/events/useEventDetail'
import { ChevronLeft, MapPin } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { useSetDetailTranslations } from '@/shared/context/DetailTranslationsContext'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function EventDetail() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useEventDetail(slug ?? '')
  const event = data?.event
  useSetDetailTranslations(event?.translations)

  return (
    <section className="page-section" aria-labelledby="event-heading">
      <div className="page-section-inner">
        <LocalizedNavLink to="/events" className="event-card-link">
          <ChevronLeft /> {t('pages.events.backToEvents')}
        </LocalizedNavLink>

        {isLoading && (
          <article
            className="event-card-detailed"
            role="status"
            aria-live="polite"
            aria-label={t('query.loading', { label: t('nouns.event') })}
          >
            <div className="event-details" aria-hidden="true">
              <Skeleton width="70%" height={34} className="skeleton-line" />
              <Skeleton width={220} height={13} className="skeleton-line" />
              <SkeletonLines widths={['100%', '100%', '90%', '75%']} height={15} />
            </div>
          </article>
        )}
        {isError && <QueryError label={t('nouns.event')} />}
        {!isLoading && !isError && !event && <QueryEmpty label={t('nouns.event')} />}

        {event && (
          <article className="event-card-detailed">
            <div className="event-details">
              <h1
                id="event-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.title) }}
              />
              <div className="event-meta-row">
                <span>{formatDisplayDate(event.eventsFields?.eventdate)}</span>
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
