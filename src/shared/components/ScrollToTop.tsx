import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * React Router doesn't reset scroll position on navigation, so without this
 * a new page renders at whatever scroll offset the previous page was left
 * at. `behavior: 'instant'` bypasses the global `scroll-behavior: smooth`
 * on :root so the jump-to-top isn't a visible animated scroll.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
