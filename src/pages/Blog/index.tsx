import blogOliveThumb from '@/assets/design/blog-olive-thumb.png'
import blogStudentThumb from '@/assets/design/blog-student-thumb.png'
import blogTatreezThumb from '@/assets/design/blog-tatreez-thumb.png'
import { ArrowRight, FloralOrnament } from '@/shared/components/icons'

const FEATURED_POST = {
  img: blogTatreezThumb,
  title: 'Tatreez: Stitches of Memory and Identity',
  excerpt:
    'Palestinian embroidery is far more than decoration. Each pattern tells a story of place, family, and resistance—carried across generations and now across borders into Finland.',
  date: '2025-05-08',
  displayDate: '8 May 2025',
  author: 'Yasmin K.',
  readTime: '6 min read',
}

const BLOG_POSTS = [
  {
    img: blogStudentThumb,
    title: 'A Day in the Life of a Palestinian Student in Finland',
    excerpt:
      'From morning lectures to evening community gatherings, one student shares how they balance studies, identity, and belonging.',
    date: '2025-04-25',
    displayDate: '25 Apr 2025',
    author: 'Omar H.',
    readTime: '5 min read',
  },
  {
    img: blogOliveThumb,
    title: 'Olive Trees in Our Culture: Rooted and Resilient',
    excerpt:
      'Why the olive tree remains one of the most powerful symbols of Palestinian identity, continuity, and hope.',
    date: '2025-04-14',
    displayDate: '14 Apr 2025',
    author: 'Leila S.',
    readTime: '4 min read',
  },
]

export default function Blog() {
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

      {/* ── Featured Post ── */}
      <section className="page-section" aria-label="Featured blog post">
        <div className="page-section-inner">
          <article className="blog-featured">
            <div className="blog-featured-image">
              <img src={FEATURED_POST.img} alt="" loading="eager" />
            </div>
            <div className="blog-featured-body">
              <div className="blog-meta">
                <span className="blog-badge">Featured</span>
                <time dateTime={FEATURED_POST.date}>{FEATURED_POST.displayDate}</time>
              </div>
              <h2>{FEATURED_POST.title}</h2>
              <p>{FEATURED_POST.excerpt}</p>
              <div className="blog-byline">
                <span>By {FEATURED_POST.author}</span>
                <span aria-hidden="true">·</span>
                <span>{FEATURED_POST.readTime}</span>
              </div>
              <a href="#" className="blog-read-link">
                Read article <ArrowRight />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ── Recent Posts ── */}
      <section className="page-section page-section-muted" aria-labelledby="recent-posts-heading">
        <div className="page-section-inner">
          <h2 id="recent-posts-heading" className="page-section-title">
            Recent Posts
          </h2>

          <ul className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <li key={post.date}>
                <article className="blog-card">
                  <div className="blog-card-image">
                    <img src={post.img} alt="" loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <time dateTime={post.date}>{post.displayDate}</time>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-byline">
                      <span>By {post.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <a href="#" className="blog-read-link">
                      Read article <ArrowRight />
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
