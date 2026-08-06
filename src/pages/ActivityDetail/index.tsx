import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { useActivityDetail } from '@/features/activities/useActivityDetail'
import { ChevronLeft } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { useSetDetailTranslations } from '@/shared/context/DetailTranslationsContext'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function ActivityDetail() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useActivityDetail(slug ?? '')
  const activity = data?.activity
  useSetDetailTranslations(activity?.translations)

  return (
    <section className="page-section" aria-labelledby="activity-heading">
      <div className="page-section-inner">
        <LocalizedNavLink to="/activities" className="activity-card-link">
          <ChevronLeft /> {t('pages.activities.backToActivities')}
        </LocalizedNavLink>

        {isLoading && (
          <article
            className="activity-card activity-card--solo"
            role="status"
            aria-live="polite"
            aria-label={t('query.loading', { label: t('nouns.activity') })}
          >
            <div className="activity-card-body" aria-hidden="true">
              <Skeleton width={90} height={20} radius="md" className="skeleton-line" />
              <Skeleton width="70%" height={34} className="skeleton-line" />
              <SkeletonLines widths={['100%', '100%', '90%', '75%']} height={15} />
            </div>
          </article>
        )}
        {isError && <QueryError label={t('nouns.activity')} />}
        {!isLoading && !isError && !activity && <QueryEmpty label={t('nouns.activity')} />}

        {activity && (
          <article className="activity-card activity-card--solo">
            <div className="activity-card-body">
              <div className="activity-card-meta">
                <span className="activity-category">
                  {activity.activityFields?.category?.[0] ?? ''}
                </span>
                <time dateTime={activity.date ?? ''}>{formatDisplayDate(activity.date)}</time>
              </div>
              <h1
                id="activity-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(activity.title) }}
              />
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(activity.content) }} />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
