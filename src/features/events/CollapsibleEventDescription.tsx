import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

type CollapsibleEventDescriptionProps = {
  contentHtml: string | null | undefined
}

/**
 * Renders an event's rich-text summary clamped to a few lines. When the text is
 * long enough to be truncated, a "Show more" / "Show less" toggle is revealed so
 * a single card can no longer push the whole list open.
 */
export function CollapsibleEventDescription({ contentHtml }: CollapsibleEventDescriptionProps) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  const measureOverflow = useCallback(() => {
    const descriptionElement = descriptionRef.current
    if (!descriptionElement) return
    setIsOverflowing(descriptionElement.scrollHeight > descriptionElement.clientHeight + 1)
  }, [])

  useLayoutEffect(() => {
    measureOverflow()
  }, [measureOverflow, contentHtml, isExpanded])

  useEffect(() => {
    window.addEventListener('resize', measureOverflow)
    return () => window.removeEventListener('resize', measureOverflow)
  }, [measureOverflow])

  const shouldShowToggle = isOverflowing || isExpanded

  return (
    <div className="event-description-block">
      <p
        ref={descriptionRef}
        className={isExpanded ? 'event-description' : 'event-description event-description-clamped'}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(contentHtml) }}
      />
      {shouldShowToggle && (
        <button
          type="button"
          className="event-description-toggle"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((wasExpanded) => !wasExpanded)}
        >
          {isExpanded ? t('pages.events.showLess') : t('pages.events.showMore')}
        </button>
      )}
    </div>
  )
}
