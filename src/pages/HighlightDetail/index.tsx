import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router'

import { useHighlightDetail } from '@/features/highlights/useHighlightDetail'
import { ChevronLeft } from '@/shared/components/icons'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function HighlightDetail() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useHighlightDetail(slug ?? '')
  const highlight = data?.highlights

  return (
    <section className="page-section" aria-labelledby="highlight-heading">
      <div className="page-section-inner">
        <NavLink to="/highlights" className="highlight-detail-link">
          <ChevronLeft /> {t('pages.highlights.backToHighlights')}
        </NavLink>

        {isLoading && (
          <article
            className="highlight-detail"
            role="status"
            aria-live="polite"
            aria-label={t('query.loading', { label: t('nouns.highlight') })}
          >
            <div className="highlight-detail-image" aria-hidden="true">
              <Skeleton className="skeleton-fill" />
            </div>
            <div className="highlight-detail-body" aria-hidden="true">
              <Skeleton width={70} height={24} radius="md" className="skeleton-line" />
              <Skeleton width="70%" height={34} className="skeleton-line" />
              <SkeletonLines widths={['100%', '100%', '90%', '75%']} height={15} />
            </div>
          </article>
        )}
        {isError && <QueryError label={t('nouns.highlight')} />}
        {!isLoading && !isError && !highlight && <QueryEmpty label={t('nouns.highlight')} />}

        {highlight && (
          <article className="highlight-detail">
            <div className="highlight-detail-image">
              <img
                src={highlight.featuredImage?.node.sourceUrl ?? undefined}
                alt={highlight.featuredImage?.node.altText ?? ''}
              />
            </div>
            <div className="highlight-detail-body">
              {highlight.highlightFields?.tag && (
                <span className="highlight-tag">{highlight.highlightFields.tag}</span>
              )}
              <h1
                id="highlight-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(highlight.title) }}
              />
              <p>{highlight.highlightFields?.description}</p>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
