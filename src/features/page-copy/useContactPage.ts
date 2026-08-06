import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { ContactPageDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useContactPage() {
  const language = useWpLanguage()
  const slug = language === 'EN' ? 'contact' : `contact-${language.toLowerCase()}`

  return useQuery({
    queryKey: ['contactPage', slug],
    queryFn: () => gqlClient.request(ContactPageDocument, { slug }),
  })
}
