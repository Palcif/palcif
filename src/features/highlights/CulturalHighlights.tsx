import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'

import activitiesIftarThumb from '@/assets/design/activities-iftar-thumb.png'
import blogOliveThumb from '@/assets/design/blog-olive-thumb.png'
import blogTatreezThumb from '@/assets/design/blog-tatreez-thumb.png'
import { ArrowRight, ChevronLeft, ChevronRight } from '@/shared/components/icons'

const HIGHLIGHTS = [
  {
    id: 'olive-trees',
    img: blogOliveThumb,
    imgAlt: 'Olive branches against a sunlit Palestinian landscape',
    title: 'Olive Trees in Our Culture',
    description: 'A symbol of resilience, connection, and heritage.',
    tag: 'Culture',
    to: '/blog',
  },
  {
    id: 'tatreez',
    img: blogTatreezThumb,
    imgAlt: 'Close-up of traditional Palestinian tatreez embroidery',
    title: 'Tatreez: Stitches of Memory and Identity',
    description: 'Each stitch tells a story passed down through generations.',
    tag: 'Story',
    to: '/blog',
  },
  {
    id: 'maqluba',
    img: activitiesIftarThumb,
    imgAlt: 'Community members gathering around a shared Palestinian meal',
    title: 'Traditional Maqluba Workshop',
    description: 'Learn, cook, and share flavors from our Palestinian kitchen.',
    tag: 'Workshop',
    to: '/events',
  },
]

export default function CulturalHighlights() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
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
    setActiveIndex(Math.max(0, Math.min(newIndex, HIGHLIGHTS.length - 1)))
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    return () => track.removeEventListener('scroll', updateScrollState)
  }, [])

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
            {HIGHLIGHTS.map((item, index) => (
              <article
                key={item.id}
                className="highlight-card"
                aria-label={`${index + 1} of ${HIGHLIGHTS.length}`}
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
                    <h3 id={`highlight-title-${item.id}`}>{item.title}</h3>
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
          {HIGHLIGHTS.map((item, index) => (
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
