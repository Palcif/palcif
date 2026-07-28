import { NavLink, useParams } from 'react-router'

import { useBlogPost } from '@/features/blog/useBlogPost'
import { ChevronLeft } from '@/shared/components/icons'
import { QueryEmpty, QueryError, QueryLoading } from '@/shared/components/QueryStatus'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError } = useBlogPost(slug ?? '')
  const post = data?.post

  return (
    <section className="page-section" aria-labelledby="post-heading">
      <div className="page-section-inner">
        <NavLink to="/blog" className="blog-read-link">
          <ChevronLeft /> Back to Blog
        </NavLink>

        {isLoading && <QueryLoading label="blog post" />}
        {isError && <QueryError label="blog post" />}
        {!isLoading && !isError && !post && <QueryEmpty label="blog post" />}

        {post && (
          <article className="blog-featured">
            {post.featuredImage?.node.sourceUrl && (
              <div className="blog-featured-image">
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText ?? ''}
                />
              </div>
            )}
            <div className="blog-featured-body">
              <div className="blog-meta">
                <time dateTime={post.date ?? undefined}>
                  {post.date ? new Date(post.date).toLocaleDateString() : ''}
                </time>
              </div>
              <h1 id="post-heading" dangerouslySetInnerHTML={{ __html: post.title ?? '' }} />
              <div className="blog-byline">
                <span>By {post.author?.node.name}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
