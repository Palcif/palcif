import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { ActivityDetailDocument } from '@/graphql/generated/graphql'

export function useActivityDetail(slug: string) {
  return useQuery({
    queryKey: ['activityDetail', slug],
    queryFn: () => gqlClient.request(ActivityDetailDocument, { slug }),
    enabled: slug.length > 0,
  })
}
