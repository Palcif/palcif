import { useSiteShell } from '@/features/site-shell/useSiteShell'

import { resolveMenuItems } from './resolveMenuItem'

/**
 * The three admin-managed menus, one per Appearance > Menus location, resolved
 * into renderable items for the current language. Empty arrays when a menu is
 * unassigned or the request is still loading/failed — callers render nothing
 * rather than a hardcoded fallback.
 */
export function useSiteMenus() {
  const query = useSiteShell()

  return {
    status: query,
    header: resolveMenuItems(query.data?.headerMenu?.nodes),
    footerExplore: resolveMenuItems(query.data?.footerExploreMenu?.nodes),
    footerLegal: resolveMenuItems(query.data?.footerLegalMenu?.nodes),
  }
}
