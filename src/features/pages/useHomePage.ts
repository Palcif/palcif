import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { HomePageDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

/**
 * The homepage's WordPress page: hero copy (`content`) plus its Featured Image,
 * which editors set under Pages > Home to control the hero visual. Kept separate
 * from the generic `usePage` so the featured-image field stays scoped to the
 * homepage for now.
 */
export function useHomePage() {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['homePage', language],
    queryFn: () => gqlClient.request(HomePageDocument, { language }),
  })
}
