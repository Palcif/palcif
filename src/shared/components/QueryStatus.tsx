import { useTranslation } from 'react-i18next'

export function QueryLoading({ label }: { label: string }) {
  const { t } = useTranslation()
  return (
    <div className="query-status query-status-loading" role="status">
      <p>{t('query.loading', { label })}</p>
    </div>
  )
}

export function QueryError({ label }: { label: string }) {
  const { t } = useTranslation()
  return (
    <div className="query-status query-status-error" role="alert">
      <p>{t('query.error', { label })}</p>
    </div>
  )
}

export function QueryEmpty({ label }: { label: string }) {
  const { t } = useTranslation()
  return (
    <div className="query-status query-status-empty">
      <p>{t('query.empty', { label })}</p>
    </div>
  )
}
