import type { ComponentProps } from 'react'
import { Link, NavLink } from 'react-router'

import { useLocalizedPath } from '@/shared/hooks/useLocalizedPath'

export function LocalizedLink({ to, ...props }: ComponentProps<typeof Link>) {
  const localize = useLocalizedPath()
  return <Link {...props} to={typeof to === 'string' ? localize(to) : to} />
}

export function LocalizedNavLink({ to, ...props }: ComponentProps<typeof NavLink>) {
  const localize = useLocalizedPath()
  return <NavLink {...props} to={typeof to === 'string' ? localize(to) : to} />
}
