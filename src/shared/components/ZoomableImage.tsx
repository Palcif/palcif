import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { useImageLightbox } from '@/shared/context/ImageLightboxContext'

interface ZoomableImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

/**
 * A card / thumbnail image that opens the app-wide lightbox when clicked or
 * activated by keyboard. Without a `src` it renders a plain, inert image so
 * callers don't have to special-case missing media.
 */
export function ZoomableImage({ src, alt, className, loading = 'lazy' }: ZoomableImageProps) {
  const { t } = useTranslation()
  const { openImageLightbox } = useImageLightbox()

  if (!src) {
    return <img alt={alt} className={className} loading={loading} />
  }

  const imageSrc = src

  function open() {
    openImageLightbox({ src: imageSrc, alt })
  }

  function handleKeyDown(keyboardEvent: ReactKeyboardEvent<HTMLImageElement>) {
    if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return
    keyboardEvent.preventDefault()
    open()
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      role="button"
      tabIndex={0}
      aria-label={t('common.enlargeImageAria')}
      onClick={open}
      onKeyDown={handleKeyDown}
    />
  )
}
