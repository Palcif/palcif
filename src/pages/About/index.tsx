import { useTranslation } from 'react-i18next'

import { usePage } from '@/features/pages/usePage'
import { FloralOrnament } from '@/shared/components/icons'
import { LocalizedNavLink } from '@/shared/components/LocalizedLink'
import { QueryEmpty, QueryError } from '@/shared/components/QueryStatus'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function About() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = usePage('about')
  const about = data?.pages?.nodes[0]

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="page-hero-inner">
          <h1 id="about-heading">{t('pages.about.title')}</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Page Content ── */}
      <section className="page-section" aria-label={t('pages.about.title')}>
        <div className="page-section-inner">
          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              aria-label={t('query.loading', { label: t('pages.about.title') })}
            >
              <SkeletonLines widths={['100%', '100%', '80%', '90%', '100%', '70%']} height={15} />
            </div>
          )}
          {isError && <QueryError label={t('pages.about.title')} />}
          {!isLoading && !isError && !about && <QueryEmpty label={t('pages.about.title')} />}
          {about && (
            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(about.content) }}
            />
          )}
          <LocalizedNavLink to="/contact" className="btn-primary">
            {t('pages.about.getInTouch')}
          </LocalizedNavLink>
        </div>
      </section>
    </>
  )
}
