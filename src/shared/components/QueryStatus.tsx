export function QueryLoading({ label }: { label: string }) {
  return (
    <div className="query-status query-status-loading" role="status">
      <p>Loading {label}…</p>
    </div>
  )
}

export function QueryError({ label }: { label: string }) {
  return (
    <div className="query-status query-status-error" role="alert">
      <p>We couldn&apos;t load {label} right now. Please try again later.</p>
    </div>
  )
}

export function QueryEmpty({ label }: { label: string }) {
  return (
    <div className="query-status query-status-empty">
      <p>No {label} yet — check back soon.</p>
    </div>
  )
}
