import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router'

import { SECTIONS } from '@/features/posts/sections'
import { usePost } from '@/features/posts/usePost'
import { ChevronLeft } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { useSetDetailTranslations } from '@/shared/context/DetailTranslationsContext'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function PostDetail() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const sectionPath = location.pathname.split('/')[2] ?? ''
  const section = SECTIONS.find((candidate) => candidate.path === sectionPath) ?? SECTIONS[0]

  const { data, isLoading, isError } = usePost(slug ?? '')
  const post = data?.post
  useSetDetailTranslations(post?.translations)

  const noun = t(section.nounKey)

  return (
    <section className="page-section" aria-labelledby="post-detail-heading">
      <div className="page-section-inner">
        <LocalizedNavLink to={`/${section.path}`} className="post-detail-back-link">
          <ChevronLeft /> {t(section.backLabelKey)}
        </LocalizedNavLink>

        {isLoading && (
          <article
            className="post-detail"
            role="status"
            aria-live="polite"
            aria-label={t('query.loading', { label: noun })}
          >
            <div className="post-detail-body" aria-hidden="true">
              <Skeleton width={100} height={13} className="skeleton-line" />
              <Skeleton width="70%" height={34} className="skeleton-line" />
              <SkeletonLines widths={['100%', '100%', '90%', '75%']} height={15} />
            </div>
          </article>
        )}
        {isError && <QueryError label={noun} />}
        {!isLoading && !isError && !post && <QueryEmpty label={noun} />}

        {post && (
          <article className="post-detail">
            <div className="post-detail-body">
              <div className="post-detail-meta">
                {post.tags?.nodes.map((tag) =>
                  tag.name ? (
                    <span key={tag.name} className="post-detail-tag">
                      {tag.name}
                    </span>
                  ) : null
                )}
                <time dateTime={post.date ?? undefined}>{formatDisplayDate(post.date)}</time>
              </div>
              <h1
                id="post-detail-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title) }}
              />
              {post.author?.node.name && (
                <div className="post-detail-byline">
                  <span>{t('post.byAuthor', { author: post.author.node.name })}</span>
                </div>
              )}
              <div
                className="page-content"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
              />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
