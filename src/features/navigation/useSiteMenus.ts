import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { SiteMenusDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

import { resolveMenuItems } from './resolveMenuItem'

/**
 * The three admin-managed menus, one per Appearance > Menus location, resolved
 * into renderable items for the current language. Empty arrays when a menu is
 * unassigned or the request is still loading/failed — callers render nothing
 * rather than a hardcoded fallback.
 */
export function useSiteMenus() {
  const language = useWpLanguage()

  const query = useQuery({
    queryKey: ['siteMenus', language],
    queryFn: () => gqlClient.request(SiteMenusDocument, { language }),
  })

  return {
    status: query,
    header: resolveMenuItems(query.data?.headerMenu?.nodes),
    footerExplore: resolveMenuItems(query.data?.footerExploreMenu?.nodes),
    footerLegal: resolveMenuItems(query.data?.footerLegalMenu?.nodes),
  }
}
