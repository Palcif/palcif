import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Close } from '@/shared/components/icons'

interface ImageLightboxProps {
  imageSrc: string
  imageAlt: string
  onClose: () => void
}

/**
 * Full-screen viewer for a single image, rendered into `document.body` so it
 * escapes any transformed/overflow-clipped ancestor. Closes on backdrop click,
 * the close button, or Escape; restores scroll and focus when it unmounts.
 */
export function ImageLightbox({ imageSrc, imageAlt, onClose }: ImageLightboxProps) {
  const { t } = useTranslation()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === 'Escape') {
        onClose()
      }
      // Only the close button is focusable inside the dialog, so keep Tab on it.
      if (keyboardEvent.key === 'Tab') {
        keyboardEvent.preventDefault()
        closeButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    const originalBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalBodyOverflow
      previouslyFocusedElement?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <div
      className="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={t('common.imageViewerAria')}
      onClick={onClose}
    >
      <button
        type="button"
        ref={closeButtonRef}
        className="image-lightbox-close"
        onClick={onClose}
        aria-label={t('common.closeImageAria')}
      >
        <Close />
      </button>
      <img
        className="image-lightbox-image"
        src={imageSrc}
        alt={imageAlt}
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      />
    </div>,
    document.body
  )
}
