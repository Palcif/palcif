import { useTranslation } from 'react-i18next'

import { useSectionPosts } from '@/features/posts/useSectionPosts'
import { FloralOrnament } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Highlights() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useSectionPosts('highlights')
  const highlights = (data?.posts?.nodes ?? []).map((item) => ({
    id: item.id,
    img: item.featuredImage?.node.sourceUrl ?? undefined,
    imgAlt: item.featuredImage?.node.altText ?? '',
    title: item.title ?? '',
    excerpt: item.excerpt ?? '',
    tag: item.tags?.nodes[0]?.name ?? '',
    to: `/highlights/${item.slug}`,
  }))

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="highlights-page-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">{t('pages.highlights.tagline')}</p>
          <h1 id="highlights-page-heading">{t('pages.highlights.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">{t('pages.highlights.description')}</p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      <section className="page-section" aria-label={t('pages.highlights.gridAriaLabel')}>
        <div className="page-section-inner">
          {isLoading && (
            <ul
              className="highlights-grid"
              role="status"
              aria-live="polite"
              aria-label={t('pages.highlights.loadingAriaLabel')}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <li key={index}>
                  <article className="highlight-card" aria-hidden="true">
                    <div className="highlight-card-link">
                      <div className="highlight-media">
                        <Skeleton className="skeleton-fill" />
                      </div>
                      <div className="highlight-body">
                        <Skeleton width="80%" height={21} className="skeleton-line" />
                        <Skeleton width="100%" height={14} className="skeleton-line" />
                        <Skeleton width={70} height={24} radius="md" />
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {isError && <QueryError label={t('nouns.highlights')} />}

          {!isLoading && !isError && highlights.length === 0 && (
            <QueryEmpty label={t('nouns.highlights')} />
          )}

          {!isLoading && !isError && highlights.length > 0 && (
            <ul className="highlights-grid">
              {highlights.map((item) => (
                <li key={item.id}>
                  <article className="highlight-card">
                    <LocalizedNavLink
                      to={item.to}
                      className="highlight-card-link"
                      aria-labelledby={`highlights-page-title-${item.id}`}
                    >
                      <div className="highlight-media">
                        <img src={item.img} alt={item.imgAlt} loading="lazy" />
                      </div>
                      <div className="highlight-body">
                        <h3
                          id={`highlights-page-title-${item.id}`}
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                        />
                        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.excerpt) }} />
                        {item.tag && <span className="highlight-tag">{item.tag}</span>}
                      </div>
                    </LocalizedNavLink>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
