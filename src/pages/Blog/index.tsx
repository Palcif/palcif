import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import { useBlogPosts } from '@/features/blog/useBlogPosts'
import { ArrowRight, FloralOrnament } from '@/shared/components/icons'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { formatDisplayDate } from '@/shared/utils/date'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Blog() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useBlogPosts()
  const posts = data?.posts?.nodes ?? []
  const [featuredPost, ...recentPosts] = posts

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="blog-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">{t('pages.blog.tagline')}</p>
          <h1 id="blog-heading">{t('pages.blog.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">{t('pages.blog.description')}</p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {isLoading && (
        <section
          className="page-section"
          role="status"
          aria-live="polite"
          aria-label={t('pages.blog.loadingAriaLabel')}
        >
          <div className="page-section-inner">
            <article className="blog-featured" aria-hidden="true">
              <div className="blog-featured-image">
                <Skeleton className="skeleton-fill" />
              </div>
              <div className="blog-featured-body">
                <div className="blog-meta">
                  <Skeleton width={100} height={22} radius="md" />
                  <Skeleton width={90} height={13} />
                </div>
                <Skeleton width="70%" height={30} className="skeleton-line" />
                <SkeletonLines widths={['100%', '90%', '40%']} height={15} />
              </div>
            </article>

            <ul className="blog-grid">
              {Array.from({ length: 2 }, (_, index) => (
                <li key={index}>
                  <article className="blog-card" aria-hidden="true">
                    <div className="blog-card-image">
                      <Skeleton className="skeleton-fill" />
                    </div>
                    <div className="blog-card-body">
                      <Skeleton width={90} height={13} className="skeleton-line" />
                      <Skeleton width="85%" height={22} className="skeleton-line" />
                      <SkeletonLines widths={['100%', '70%']} height={14} />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {isError && (
        <section className="page-section" aria-label={t('pages.blog.errorAriaLabel')}>
          <div className="page-section-inner">
            <QueryError label={t('nouns.blogPosts')} />
          </div>
        </section>
      )}

      {!isLoading && !isError && posts.length === 0 && (
        <section className="page-section" aria-label={t('pages.blog.emptyAriaLabel')}>
          <div className="page-section-inner">
            <QueryEmpty label={t('nouns.blogPosts')} />
          </div>
        </section>
      )}

      {featuredPost && (
        <section className="page-section" aria-label={t('pages.blog.featuredAriaLabel')}>
          <div className="page-section-inner">
            <article className="blog-featured">
              <div className="blog-featured-image">
                <img
                  src={featuredPost.featuredImage?.node.sourceUrl ?? undefined}
                  alt={featuredPost.featuredImage?.node.altText ?? ''}
                  loading="eager"
                />
              </div>
              <div className="blog-featured-body">
                <div className="blog-meta">
                  <span className="blog-badge">{t('pages.blog.featuredBadge')}</span>
                  <time dateTime={featuredPost.date ?? undefined}>
                    {formatDisplayDate(featuredPost.date)}
                  </time>
                </div>
                <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(featuredPost.title) }} />
                <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(featuredPost.excerpt) }} />
                <div className="blog-byline">
                  <span>
                    {t('pages.blog.byAuthor', { author: featuredPost.author?.node.name ?? '' })}
                  </span>
                </div>
                <NavLink to={`/blog/${featuredPost.slug}`} className="blog-read-link">
                  {t('pages.blog.readArticle')} <ArrowRight />
                </NavLink>
              </div>
            </article>
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="page-section page-section-muted" aria-labelledby="recent-posts-heading">
          <div className="page-section-inner">
            <h2 id="recent-posts-heading" className="page-section-title">
              {t('pages.blog.recentPostsHeading')}
            </h2>

            <ul className="blog-grid">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <article className="blog-card">
                    <div className="blog-card-image">
                      <img
                        src={post.featuredImage?.node.sourceUrl ?? undefined}
                        alt={post.featuredImage?.node.altText ?? ''}
                      />
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-meta">
                        <time dateTime={post.date ?? undefined}>
                          {formatDisplayDate(post.date)}
                        </time>
                      </div>
                      <h3 dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title) }} />
                      <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt) }} />
                      <div className="blog-byline">
                        <span>
                          {t('pages.blog.byAuthor', { author: post.author?.node.name ?? '' })}
                        </span>
                      </div>
                      <NavLink to={`/blog/${post.slug}`} className="blog-read-link">
                        {t('pages.blog.readArticle')} <ArrowRight />
                      </NavLink>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
