import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { useBlogPost } from '@/features/blog/useBlogPost'
import { ChevronLeft } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { useSetDetailTranslations } from '@/shared/context/DetailTranslationsContext'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function BlogPost() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useBlogPost(slug ?? '')
  const post = data?.post
  useSetDetailTranslations(post?.translations)

  return (
    <section className="page-section" aria-labelledby="post-heading">
      <div className="page-section-inner">
        <LocalizedNavLink to="/blog" className="blog-read-link">
          <ChevronLeft /> {t('pages.blog.backToBlog')}
        </LocalizedNavLink>

        {isLoading && (
          <article
            className="blog-featured blog-featured--solo"
            role="status"
            aria-live="polite"
            aria-label={t('query.loading', { label: t('nouns.blogPost') })}
          >
            <div className="blog-featured-body" aria-hidden="true">
              <Skeleton width={100} height={13} className="skeleton-line" />
              <Skeleton width="70%" height={34} className="skeleton-line" />
              <Skeleton width={140} height={13} className="skeleton-line" />
              <SkeletonLines widths={['100%', '100%', '90%', '75%']} height={15} />
            </div>
          </article>
        )}
        {isError && <QueryError label={t('nouns.blogPost')} />}
        {!isLoading && !isError && !post && <QueryEmpty label={t('nouns.blogPost')} />}

        {post && (
          <article className="blog-featured blog-featured--solo">
            <div className="blog-featured-body">
              <div className="blog-meta">
                <time dateTime={post.date ?? undefined}>{formatDisplayDate(post.date)}</time>
              </div>
              <h1
                id="post-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title) }}
              />
              <div className="blog-byline">
                <span>{t('pages.blog.byAuthor', { author: post.author?.node.name ?? '' })}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
