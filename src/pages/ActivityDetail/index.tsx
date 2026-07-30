import { NavLink, useParams } from 'react-router'

import { useActivityDetail } from '@/features/activities/useActivityDetail'
import { ChevronLeft } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useActivityDetail(slug ?? '')
  const activity = data?.activity

  return (
    <section className="page-section" aria-labelledby="activity-heading">
      <div className="page-section-inner">
        <NavLink to="/activities" className="activity-card-link">
          <ChevronLeft /> Back to Activities
        </NavLink>

        {isLoading && <QueryLoading label="activity" />}
        {isError && <QueryError label="activity" />}
        {!isLoading && !isError && !activity && <QueryEmpty label="activity" />}

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
