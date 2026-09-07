import { LocalizedNavLink } from '@/shared/components/LocalizedLink'

import type { ResolvedMenuItem } from './resolveMenuItem'

interface MenuLinkProps {
  item: ResolvedMenuItem
  /** Base class applied in every state (e.g. `nav-link`, `footer-link`). */
  className: string
  /** Appended to `className` when the internal route is active. */
  activeClassName?: string
  /** Called after a click — used to close the mobile menu. */
  onNavigate?: () => void
}

/**
 * Renders one resolved menu item: an in-app `LocalizedNavLink` for internal
 * routes (with active styling), or a plain anchor for off-site links.
 */
export function MenuLink({
  item,
  className,
  activeClassName = 'active',
  onNavigate,
}: MenuLinkProps) {
  if (item.kind === 'external') {
    return (
      <a
        href={item.href}
        className={className}
        target={item.opensInNewTab ? '_blank' : undefined}
        rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    )
  }

  return (
    <LocalizedNavLink
      to={item.to}
      end={item.isSiteRoot}
      className={({ isActive }) => (isActive ? `${className} ${activeClassName}` : className)}
      onClick={onNavigate}
    >
      {item.label}
    </LocalizedNavLink>
  )
}
