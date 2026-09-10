import { useTranslation } from 'react-i18next'

import { FloralOrnament } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <section className="page-hero" aria-labelledby="not-found-heading">
        <div className="page-hero-inner">
          <h1 id="not-found-heading">{t('pages.notFound.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      <section className="page-section" aria-label={t('pages.notFound.title')}>
        <div className="page-section-inner">
          <p className="page-content">{t('pages.notFound.body')}</p>
          <LocalizedNavLink to="/" className="btn-primary">
            {t('pages.notFound.backHome')}
          </LocalizedNavLink>
        </div>
      </section>
    </>
  )
}
