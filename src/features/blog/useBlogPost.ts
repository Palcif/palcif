import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { BlogPostDocument } from '@/graphql/generated/graphql'

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => gqlClient.request(BlogPostDocument, { slug }),
    enabled: slug.length > 0,
  })
}
