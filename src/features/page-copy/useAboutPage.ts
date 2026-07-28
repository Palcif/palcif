import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { AboutPageDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useAboutPage() {
  const language = useWpLanguage()
  const slug = language === 'EN' ? 'about' : `about-${language.toLowerCase()}`

  return useQuery({
    queryKey: ['aboutPage', slug],
    queryFn: () => gqlClient.request(AboutPageDocument, { slug }),
  })
}
