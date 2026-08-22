import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { PostDetailDocument } from '@/graphql/generated/graphql'

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => gqlClient.request(PostDetailDocument, { slug }),
    enabled: slug.length > 0,
  })
}
