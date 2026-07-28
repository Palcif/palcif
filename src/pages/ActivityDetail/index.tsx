import { NavLink, useParams } from 'react-router'

import { useActivityDetail } from '@/features/activities/useActivityDetail'
import { ChevronLeft } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'

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
          <article className="activity-card">
            {activity.featuredImage?.node.sourceUrl && (
              <div className="activity-card-thumb">
                <img
                  src={activity.featuredImage.node.sourceUrl}
                  alt={activity.featuredImage.node.altText ?? ''}
                />
              </div>
            )}
            <div className="activity-card-body">
              <div className="activity-card-meta">
                <span className="activity-category">
                  {activity.activityFields?.category?.[0] ?? ''}
                </span>
                <time dateTime={activity.date ?? ''}>
                  {activity.date ? new Date(activity.date).toLocaleDateString() : ''}
                </time>
              </div>
              <h1
                id="activity-heading"
                dangerouslySetInnerHTML={{ __html: activity.title ?? '' }}
              />
              <div dangerouslySetInnerHTML={{ __html: activity.content ?? '' }} />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
