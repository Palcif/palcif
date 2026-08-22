import { useTranslation } from 'react-i18next'

import { useSectionPosts } from '@/features/posts/useSectionPosts'
import { ArrowRight, FloralOrnament } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import SectionHeader from '@/shared/components/SectionHeader'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Activities() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useSectionPosts('activities')
  const activities = data?.posts?.nodes ?? []

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="activities-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">{t('pages.activities.tagline')}</p>
          <h1 id="activities-heading">{t('pages.activities.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">{t('pages.activities.description')}</p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Activities Feed ── */}
      <section className="page-section" aria-label={t('pages.activities.feedAriaLabel')}>
        <div className="page-section-inner">
          <SectionHeader
            title={t('pages.activities.latestActivities')}
            action={t('pages.activities.viewArchive')}
          />

          {isError && <QueryError label={t('nouns.activities')} />}
          {!isLoading && !isError && activities.length === 0 && (
            <QueryEmpty label={t('nouns.activities')} />
          )}

          <ul
            className="activity-feed"
            role={isLoading ? 'status' : undefined}
            aria-live={isLoading ? 'polite' : undefined}
            aria-label={
              isLoading ? t('query.loading', { label: t('nouns.activities') }) : undefined
            }
          >
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <li key={index}>
                    <article className="activity-card" aria-hidden="true">
                      <div className="activity-card-thumb">
                        <Skeleton className="skeleton-fill" />
                      </div>
                      <div className="activity-card-body">
                        <div className="activity-card-meta">
                          <Skeleton width={90} height={20} radius="md" />
                          <Skeleton width={70} height={13} />
                        </div>
                        <Skeleton width="75%" height={24} className="skeleton-line" />
                        <Skeleton width="100%" height={14} className="skeleton-line" />
                        <Skeleton width="60%" height={14} className="skeleton-line" />
                      </div>
                    </article>
                  </li>
                ))
              : activities.map((item) => (
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
                          {item.tags?.nodes[0]?.name && (
                            <span className="activity-category">{item.tags.nodes[0].name}</span>
                          )}
                          <time dateTime={item.date ?? ''}>{formatDisplayDate(item.date)}</time>
                        </div>
                        <h3 dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }} />
                        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.excerpt) }} />
                        <LocalizedNavLink
                          to={`/activities/${item.slug}`}
                          className="activity-card-link"
                        >
                          {t('pages.activities.readMore')} <ArrowRight />
                        </LocalizedNavLink>
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
