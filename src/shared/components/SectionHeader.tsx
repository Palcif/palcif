import { ArrowRight } from './icons'
import { LocalizedNavLink } from './LocalizedLink'

interface SectionHeaderProps {
  title: string
  action: string
  to?: string
}

export default function SectionHeader({ title, action, to }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h3>{title}</h3>
      {to ? (
        <LocalizedNavLink to={to} className="text-link">
          {action} <ArrowRight />
        </LocalizedNavLink>
      ) : (
        <span className="text-link" aria-disabled="true">
          {action} <ArrowRight />
        </span>
      )}
    </div>
  )
}
