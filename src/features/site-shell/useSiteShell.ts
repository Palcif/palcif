import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { SiteShellDocument, type SiteShellQuery } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

/**
 * The menus and site settings shown on every page, fetched as one request.
 * `useSiteMenus` and `useSiteSettings` both read from this single cache entry
 * (via `select`), so the header, footer and contact page share one round trip.
 */
export function useSiteShell<Selected = SiteShellQuery>(
  select?: (data: SiteShellQuery) => Selected
) {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['siteShell', language],
    queryFn: () => gqlClient.request(SiteShellDocument, { language }),
    select,
  })
}
