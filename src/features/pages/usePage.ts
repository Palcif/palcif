import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { PageContentDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function usePage(slug: string) {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['page', slug, language],
    queryFn: () => gqlClient.request(PageContentDocument, { language, slug }),
  })
}
