import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { HomePageDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useHomePage() {
  const language = useWpLanguage()
  const slug = language === 'EN' ? 'home' : `home-${language.toLowerCase()}`

  return useQuery({
    queryKey: ['homePage', slug],
    queryFn: () => gqlClient.request(HomePageDocument, { slug }),
  })
}
