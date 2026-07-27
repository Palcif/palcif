import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { BlogPostsDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useBlogPosts() {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['blogPosts', language],
    queryFn: () => gqlClient.request(BlogPostsDocument, { language }),
  })
}
