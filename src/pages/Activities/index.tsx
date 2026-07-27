import { useActivities } from '@/features/activities/useActivities'
import { ArrowRight, FloralOrnament } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'
import SectionHeader from '@/shared/components/SectionHeader'

const CATEGORIES = ['All', 'Community', 'Culture', 'Advocacy', 'Family']

export default function Activities() {
  const { data, isLoading, isError } = useActivities()
  const activities = data?.activities?.nodes ?? []

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="activities-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">What we do together</p>
          <h1 id="activities-heading">Activities</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            Gatherings, workshops, and community moments that keep our culture alive in Finland.
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Activities Feed ── */}
      <section className="page-section" aria-label="Latest activities">
        <div className="page-section-inner">
          <SectionHeader title="Latest Activities" action="View archive" />

          <div className="category-filter" role="group" aria-label="Filter activities by category">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill${category === 'All' ? ' active' : ''}`}
                aria-pressed={category === 'All'}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading && <QueryLoading label="activities" />}
          {isError && <QueryError label="activities" />}
          {!isLoading && !isError && activities.length === 0 && <QueryEmpty label="activities" />}

          <ul className="activity-feed">
            {activities.map((item) => (
              <li key={item.id}>
                <article className="activity-card">
                  <div className="activity-card-thumb">
                    <img
                      src={item.featuredImage?.node.sourceUrl ?? undefined}
                      alt={item.featuredImage?.node.altText ?? ''}
                      loading="lazy"
                    />
                  </div>
                  <div className="activity-card-body">
                    <div className="activity-card-meta">
                      <span className="activity-category">
                        {item.activityFields?.category?.[0] ?? ''}
                      </span>
                      <time dateTime={item.date ?? ''}>
                        {item.date ? new Date(item.date).toLocaleDateString() : ''}
                      </time>
                    </div>
                    <h3 dangerouslySetInnerHTML={{ __html: item.title ?? '' }} />
                    <p>{item.activityFields?.summary}</p>
                    <a href="#" className="activity-card-link">
                      Read more <ArrowRight />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
