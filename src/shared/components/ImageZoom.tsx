import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useImageLightbox } from '@/shared/context/ImageLightboxContext'

interface ImageZoomProps {
  className?: string
  /** Rendered as normal React children (e.g. the event detail block). */
  children?: ReactNode
  /** Sanitized rich-text HTML (e.g. `post.content`); mutually exclusive with `children`. */
  richTextHtml?: string
}

const IMAGE_URL_PATTERN = /\.(jpe?g|png|gif|webp|avif)(\?.*)?$/i

/**
 * Picks the highest-resolution URL from an `srcset`, so the lightbox shows the
 * full-size image rather than whichever small variant the browser loaded for a
 * thumbnail-sized slot. Returns `null` when there is no width-described entry.
 */
function largestImageInSrcset(srcset: string): string | null {
  const widestCandidate = srcset
    .split(',')
    .map((candidate) => {
      const [candidateUrl, widthDescriptor] = candidate.trim().split(/\s+/)
      const width = widthDescriptor?.endsWith('w') ? Number.parseInt(widthDescriptor, 10) : 0
      return { candidateUrl, width }
    })
    .filter((candidate) => candidate.candidateUrl && candidate.width > 0)
    .sort((first, second) => second.width - first.width)[0]

  return widestCandidate?.candidateUrl ?? null
}

/**
 * Wraps a rich-text content block and opens any image it contains in the
 * app-wide image lightbox on click or keyboard activation. The images come from
 * sanitized HTML injected with `dangerouslySetInnerHTML`, so they can't be
 * rendered as React elements; instead a delegated handler catches clicks and a
 * MutationObserver keeps them focusable as React re-commits the HTML.
 */
export function ImageZoom({ className, children, richTextHtml }: ImageZoomProps) {
  const { t } = useTranslation()
  const { openImageLightbox } = useImageLightbox()
  const containerRef = useRef<HTMLDivElement>(null)
  const enlargeLabel = t('common.enlargeImageAria')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function markImagesZoomable() {
      const container = containerRef.current
      if (!container) return
      container
        .querySelectorAll<HTMLImageElement>('img:not([data-zoomable])')
        .forEach((contentImage) => {
          contentImage.dataset.zoomable = 'true'
          contentImage.tabIndex = 0
          contentImage.setAttribute('role', 'button')
          contentImage.setAttribute('aria-label', enlargeLabel)
        })
    }

    markImagesZoomable()
    const imagesObserver = new MutationObserver(markImagesZoomable)
    imagesObserver.observe(container, { childList: true, subtree: true })
    return () => imagesObserver.disconnect()
  }, [enlargeLabel])

  const openZoomForImage = useCallback(
    (image: HTMLImageElement) => {
      const enclosingLink = image.closest('a')
      if (enclosingLink) {
        const linkHref = enclosingLink.getAttribute('href') ?? ''
        // A "link to media file" points straight at the full-size image — use
        // it. Any other link is real navigation and should be left alone.
        if (!IMAGE_URL_PATTERN.test(linkHref)) return
        openImageLightbox({ src: linkHref, alt: image.alt })
        return
      }
      const fullSizeSrc = largestImageInSrcset(image.srcset) ?? image.currentSrc ?? image.src
      openImageLightbox({ src: fullSizeSrc, alt: image.alt })
    },
    [openImageLightbox]
  )

  const handleContentClick = useCallback(
    (mouseEvent: ReactMouseEvent<HTMLDivElement>) => {
      const target = mouseEvent.target
      if (!(target instanceof HTMLImageElement)) return
      mouseEvent.preventDefault()
      openZoomForImage(target)
    },
    [openZoomForImage]
  )

  const handleContentKeyDown = useCallback(
    (keyboardEvent: ReactKeyboardEvent<HTMLDivElement>) => {
      if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return
      const target = keyboardEvent.target
      if (!(target instanceof HTMLImageElement)) return
      keyboardEvent.preventDefault()
      openZoomForImage(target)
    },
    [openZoomForImage]
  )

  if (richTextHtml === undefined) {
    return (
      <div
        ref={containerRef}
        className={className}
        onClick={handleContentClick}
        onKeyDown={handleContentKeyDown}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onClick={handleContentClick}
      onKeyDown={handleContentKeyDown}
      dangerouslySetInnerHTML={{ __html: richTextHtml }}
    />
  )
}
