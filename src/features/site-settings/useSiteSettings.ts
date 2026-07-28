import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { SiteSettingsDocument } from '@/graphql/generated/graphql'

export function useSiteSettings() {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => gqlClient.request(SiteSettingsDocument),
  })
}
