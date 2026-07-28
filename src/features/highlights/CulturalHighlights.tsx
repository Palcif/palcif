import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'

import { useHighlights } from '@/features/highlights/useHighlights'
import { ArrowRight, ChevronLeft, ChevronRight } from '@/shared/components/icons'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

// `linkUrl` is an editor-controlled SCF field intended to hold an internal
// relative path (e.g. "/blog"). Reject anything else — including
// `javascript:`/`data:` URIs and protocol-relative `//host` values — so an
// unexpected field value can't become a script-execution or redirect vector.
function toSafeRelativePath(value: string | null | undefined): string {
  if (value && value.startsWith('/') && !value.startsWith('//')) {
    return value
  }
  return '/blog'
}

export default function CulturalHighlights() {
  const { data, isLoading } = useHighlights()
  const highlights = (data?.highlight?.nodes ?? []).map((item) => ({
    id: item.id,
    img: item.featuredImage?.node.sourceUrl ?? undefined,
    imgAlt: item.featuredImage?.node.altText ?? '',
    title: item.title ?? '',
    description: item.highlightFields?.description ?? '',
    tag: item.highlightFields?.tag ?? '',
    to: toSafeRelativePath(item.highlightFields?.linkUrl),
  }))

  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

    // Determine closest card index
    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return
    const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap || '0')
    const newIndex = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.max(0, Math.min(newIndex, highlights.length - 1)))
  }, [highlights.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    return () => track.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return
    const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap || '0')
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return
    const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap || '0')
    track.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  if (isLoading || highlights.length === 0) return null

  return (
    <section className="cultural-highlights" aria-labelledby="highlights-heading">
      <div className="highlights-container">
        <header className="highlights-header">
          <div className="highlights-title-group">
            <h2 id="highlights-heading">Cultural Highlights</h2>
            <p>Explore our stories, traditions, and creative expressions.</p>
          </div>
          <NavLink to="/blog" className="highlights-view-all">
            View all highlights
            <ArrowRight />
          </NavLink>
        </header>

        <div className="highlights-carousel">
          <button
            type="button"
            className="highlight-nav highlight-nav-prev"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous highlight"
          >
            <ChevronLeft />
          </button>

          <div
            ref={trackRef}
            className="highlights-track"
            role="region"
            aria-roledescription="carousel"
            aria-label="Cultural highlights"
          >
            {highlights.map((item, index) => (
              <article
                key={item.id}
                className="highlight-card"
                aria-label={`${index + 1} of ${highlights.length}`}
                aria-roledescription="slide"
              >
                <NavLink
                  to={item.to}
                  className="highlight-card-link"
                  aria-labelledby={`highlight-title-${item.id}`}
                >
                  <div className="highlight-media">
                    <img src={item.img} alt={item.imgAlt} loading="lazy" />
                  </div>
                  <div className="highlight-body">
                    <h3
                      id={`highlight-title-${item.id}`}
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                    />
                    <p>{item.description}</p>
                    <span className="highlight-tag">{item.tag}</span>
                  </div>
                </NavLink>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="highlight-nav highlight-nav-next"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label="Next highlight"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="highlights-dots" role="tablist" aria-label="Highlight pages">
          {highlights.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to highlight ${index + 1}`}
              className={`highlight-dot${activeIndex === index ? ' is-active' : ''}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
