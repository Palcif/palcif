import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { SectionPostsDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useSectionPosts(categorySlug: string) {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['sectionPosts', categorySlug, language],
    queryFn: () => gqlClient.request(SectionPostsDocument, { language, category: categorySlug }),
  })
}
