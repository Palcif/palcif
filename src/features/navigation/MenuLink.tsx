import { useId, useRef, useState } from 'react'

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
 * routes (with active styling), or a plain anchor for off-site links. If the
 * item has children, it's rendered as a trigger for a dropdown submenu —
 * opened on hover/focus (desktop) or click (touch/keyboard).
 */
export function MenuLink({
  item,
  className,
  activeClassName = 'active',
  onNavigate,
}: MenuLinkProps) {
  const hasChildren = item.children.length > 0
  const [isOpen, setIsOpen] = useState(false)
  const submenuId = useId()
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  // Small delay on close so moving the mouse from trigger -> submenu
  // doesn't close it before the pointer lands on the submenu itself.
  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }
  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }

  const handleNavigate = () => {
    setIsOpen(false)
    onNavigate?.()
  }

  const trigger =
    item.kind === 'external' ? (

        href={item.href}
        className={className}
        target={item.opensInNewTab ? '_blank' : undefined}
        rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-controls={hasChildren ? submenuId : undefined}
        onClick={hasChildren ? undefined : onNavigate}
      >
        {item.label}
      </a>
    ) : (
      <LocalizedNavLink
        to={item.to}
        end={item.isSiteRoot}
        className={({ isActive }) => (isActive ? `${className} ${activeClassName}` : className)}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-controls={hasChildren ? submenuId : undefined}
        onClick={hasChildren ? undefined : onNavigate}
      >
        {item.label}
      </LocalizedNavLink>
    )

  if (!hasChildren) {
    return trigger
  }

  return (
    <div
      className="menu-item-with-children"
      onMouseEnter={() => {
        cancelClose()
        setIsOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={className}
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {item.label}
        <span className="menu-item-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul id={submenuId} className="submenu" role="menu">
          {item.children.map((child) => (
            <li key={child.id} role="none">
              <MenuLink
                item={child}
                className="submenu-link"
                activeClassName={activeClassName}
                onNavigate={handleNavigate}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
