import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { ImageLightbox } from '@/shared/components/ImageLightbox'

interface LightboxImage {
  src: string
  alt: string
}

interface ImageLightboxContextValue {
  /** Opens the full-screen viewer for the given image. */
  openImageLightbox: (image: LightboxImage) => void
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null)

/**
 * Provides a single app-wide {@link ImageLightbox} instance. Any component can
 * call {@link useImageLightbox} to open it — content images in rich text, card
 * thumbnails on listing pages, etc.
 */
export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)

  const openImageLightbox = useCallback((image: LightboxImage) => {
    setActiveImage(image)
  }, [])

  const contextValue = useMemo(() => ({ openImageLightbox }), [openImageLightbox])

  return (
    <ImageLightboxContext.Provider value={contextValue}>
      {children}
      {activeImage && (
        <ImageLightbox
          imageSrc={activeImage.src}
          imageAlt={activeImage.alt}
          onClose={() => setActiveImage(null)}
        />
      )}
    </ImageLightboxContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useImageLightbox(): ImageLightboxContextValue {
  const contextValue = useContext(ImageLightboxContext)
  if (!contextValue) {
    throw new Error('useImageLightbox must be used within an ImageLightboxProvider')
  }
  return contextValue
}
