import { NavLink } from 'react-router'

import { ArrowRight } from './icons'

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
        <NavLink to={to} className="text-link">
          {action} <ArrowRight />
        </NavLink>
      ) : (
        <span className="text-link" aria-disabled="true">
          {action} <ArrowRight />
        </span>
      )}
    </div>
  )
}
