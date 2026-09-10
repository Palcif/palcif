import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'

import { normalizePagePath } from '@/features/pages/resolvePageMatch'
import { usePageByPath } from '@/features/pages/usePageByPath'
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '@/i18n/languages'
import NotFound from '@/pages/NotFound'
import { FloralOrnament } from '@/shared/components/icons'
import { QueryError } from '@/shared/components/QueryStatus'
import { SkeletonLines } from '@/shared/components/skeletons/SkeletonLines'
import { useSetDetailTranslations } from '@/shared/context/DetailTranslationsContext'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

/**
 * Catch-all route under `/:lang`. Renders any WordPress Page by its path,
 * canonicalises the URL to the page's real hierarchy, and shows a localized
 * not-found state for paths that resolve to nothing.
 */
export default function WordPressPage() {
  const { t } = useTranslation()
  const { lang: langParam, '*': splat } = useParams<{ lang: string; '*': string }>()
  const lang = isSupportedLanguage(langParam) ? langParam : DEFAULT_LANGUAGE
  const requestedPath = normalizePagePath(splat ?? '')

  const { match, isLoading, isError } = usePageByPath(requestedPath)

  const pageTranslations = useMemo(
    () =>
      match?.page.translations
        ?.filter((translation) => translation !== null)
        .map((translation) => ({
          language: translation.language,
          slug: translation.slug,
          path: translation.slug,
        })),
    [match?.page.translations]
  )
  useSetDetailTranslations(pageTranslations)

  if (requestedPath === '') return <NotFound />

  if (isLoading) {
    return (
      <section className="page-section" aria-label={t('pages.notFound.pageLabel')}>
        <div
          className="page-section-inner"
          role="status"
          aria-live="polite"
          aria-label={t('query.loading', { label: t('pages.notFound.pageLabel') })}
        >
          <SkeletonLines widths={['60%', '100%', '100%', '85%', '95%', '70%']} height={15} />
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="page-section" aria-label={t('pages.notFound.pageLabel')}>
        <div className="page-section-inner">
          <QueryError label={t('pages.notFound.pageLabel')} />
        </div>
      </section>
    )
  }

  if (!match) return <NotFound />

  if (match.canonicalPath !== requestedPath) {
    return <Navigate to={`/${lang}/${match.canonicalPath}`} replace />
  }

  return (
    <>
      <section className="page-hero" aria-labelledby="wp-page-heading">
        <div className="page-hero-inner">
          <h1
            id="wp-page-heading"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(match.page.title ?? '') }}
          />
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      <section className="page-section" aria-labelledby="wp-page-heading">
        <div className="page-section-inner">
          <div
            className="page-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(match.page.content ?? '') }}
          />
        </div>
      </section>
    </>
  )
}
