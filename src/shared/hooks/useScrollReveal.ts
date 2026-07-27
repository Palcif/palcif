import { useCallback, useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.12) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      elementRef.current = node

      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!node) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(node)
          }
        },
        { threshold, rootMargin: '0px 0px -40px 0px' }
      )

      observer.observe(node)
      observerRef.current = observer
    },
    [threshold]
  )

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return [setRef, isVisible] as const
}
