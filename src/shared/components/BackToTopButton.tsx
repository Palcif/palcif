import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowUp } from '@/shared/components/icons'

const SCROLL_REVEAL_THRESHOLD_PX = 480

export default function BackToTopButton() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > SCROLL_REVEAL_THRESHOLD_PX)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top-button${isVisible ? ' is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.backToTop')}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp />
    </button>
  )
}
