import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { EventDetailDocument } from '@/graphql/generated/graphql'

export function useEventDetail(slug: string) {
  return useQuery({
    queryKey: ['eventDetail', slug],
    queryFn: () => gqlClient.request(EventDetailDocument, { slug }),
    enabled: slug.length > 0,
  })
}
