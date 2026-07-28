import { NavLink } from 'react-router'

import { useBlogPosts } from '@/features/blog/useBlogPosts'
import { ArrowRight, FloralOrnament } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'

export default function Blog() {
  const { data, isLoading, isError } = useBlogPosts()
  const posts = data?.posts?.nodes ?? []
  const [featuredPost, ...recentPosts] = posts

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="blog-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">Stories from our community</p>
          <h1 id="blog-heading">Blog</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            Reflections on culture, identity, and everyday life from Palestinians and friends in
            Finland.
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {isLoading && (
        <section className="page-section" aria-label="Loading blog posts">
          <div className="page-section-inner">
            <QueryLoading label="blog posts" />
          </div>
        </section>
      )}

      {isError && (
        <section className="page-section" aria-label="Blog posts error">
          <div className="page-section-inner">
            <QueryError label="blog posts" />
          </div>
        </section>
      )}

      {!isLoading && !isError && posts.length === 0 && (
        <section className="page-section" aria-label="No blog posts">
          <div className="page-section-inner">
            <QueryEmpty label="blog posts" />
          </div>
        </section>
      )}

      {featuredPost && (
        <section className="page-section" aria-label="Featured blog post">
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
                  <span className="blog-badge">Featured</span>
                  <time dateTime={featuredPost.date ?? undefined}>
                    {featuredPost.date ? new Date(featuredPost.date).toLocaleDateString() : ''}
                  </time>
                </div>
                <h2 dangerouslySetInnerHTML={{ __html: featuredPost.title ?? '' }} />
                <p dangerouslySetInnerHTML={{ __html: featuredPost.excerpt ?? '' }} />
                <div className="blog-byline">
                  <span>By {featuredPost.author?.node.name}</span>
                </div>
                <NavLink to={`/blog/${featuredPost.slug}`} className="blog-read-link">
                  Read article <ArrowRight />
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
              Recent Posts
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
                          {post.date ? new Date(post.date).toLocaleDateString() : ''}
                        </time>
                      </div>
                      <h3 dangerouslySetInnerHTML={{ __html: post.title ?? '' }} />
                      <p dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }} />
                      <div className="blog-byline">
                        <span>By {post.author?.node.name}</span>
                      </div>
                      <NavLink to={`/blog/${post.slug}`} className="blog-read-link">
                        Read article <ArrowRight />
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
