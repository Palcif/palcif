import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { HighlightDetailDocument } from '@/graphql/generated/graphql'

export function useHighlightDetail(slug: string) {
  return useQuery({
    queryKey: ['highlightDetail', slug],
    queryFn: () => gqlClient.request(HighlightDetailDocument, { slug }),
    enabled: slug.length > 0,
  })
}
