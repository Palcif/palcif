import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

export default function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`lazy-img-wrap ${className}`}>
      {!loaded && <div className="skeleton lazy-img-skeleton" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'is-loaded' : 'is-loading'}
      />
    </div>
  )
}
