import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSectionPosts } from '@/features/posts/useSectionPosts'
import { ArrowRight, ChevronLeft, ChevronRight } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { Skeleton } from '@/shared/components/skeletons/Skeleton'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function CulturalHighlights() {
  const { t } = useTranslation()
  const { data, isLoading } = useSectionPosts('highlights')
  const highlights = (data?.posts?.nodes ?? []).map((item) => ({
    id: item.id,
    img: item.featuredImage?.node.sourceUrl ?? undefined,
    imgAlt: item.featuredImage?.node.altText ?? '',
    title: item.title ?? '',
    excerpt: item.excerpt ?? '',
    tag: item.tags?.nodes[0]?.name ?? '',
    to: `/highlights/${item.slug}`,
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

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    return () => track.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const hasOverflow = canScrollLeft || canScrollRight

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

  if (isLoading) {
    return (
      <section className="cultural-highlights" aria-labelledby="highlights-heading">
        <div className="highlights-container">
          <header className="highlights-header">
            <div className="highlights-title-group">
              <h2 id="highlights-heading">{t('highlights.heading')}</h2>
              <p>{t('highlights.subheading')}</p>
            </div>
          </header>

          <div
            className="highlights-track"
            role="status"
            aria-live="polite"
            aria-label={t('query.loading', { label: t('nouns.highlights') })}
          >
            {Array.from({ length: 3 }, (_, index) => (
              <article key={index} className="highlight-card" aria-hidden="true">
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
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (highlights.length === 0) return null

  return (
    <section className="cultural-highlights" aria-labelledby="highlights-heading">
      <div className="highlights-container">
        <header className="highlights-header">
          <div className="highlights-title-group">
            <h2 id="highlights-heading">{t('highlights.heading')}</h2>
            <p>{t('highlights.subheading')}</p>
          </div>
          <LocalizedNavLink to="/highlights" className="highlights-view-all">
            {t('highlights.viewAll')}
            <ArrowRight />
          </LocalizedNavLink>
        </header>

        <div className={`highlights-carousel${hasOverflow ? '' : ' highlights-carousel-fit'}`}>
          {hasOverflow && (
            <button
              type="button"
              className="highlight-nav highlight-nav-prev"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label={t('highlights.prevAria')}
            >
              <ChevronLeft />
            </button>
          )}

          <div
            ref={trackRef}
            className={`highlights-track${hasOverflow ? '' : ' is-centered'}`}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('highlights.carouselAria')}
          >
            {highlights.map((item, index) => (
              <article
                key={item.id}
                className="highlight-card"
                aria-label={t('highlights.slideAriaLabel', {
                  index: index + 1,
                  total: highlights.length,
                })}
                aria-roledescription="slide"
              >
                <LocalizedNavLink
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
                    <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.excerpt) }} />
                    {item.tag && <span className="highlight-tag">{item.tag}</span>}
                  </div>
                </LocalizedNavLink>
              </article>
            ))}
          </div>

          {hasOverflow && (
            <button
              type="button"
              className="highlight-nav highlight-nav-next"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label={t('highlights.nextAria')}
            >
              <ChevronRight />
            </button>
          )}
        </div>

        {hasOverflow && (
          <div className="highlights-dots" role="tablist" aria-label={t('highlights.dotsAria')}>
            {highlights.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={t('highlights.goToAria', { index: index + 1 })}
                className={`highlight-dot${activeIndex === index ? ' is-active' : ''}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
