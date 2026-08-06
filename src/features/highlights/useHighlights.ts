import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { HighlightsDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useHighlights() {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['highlights', language],
    queryFn: () => gqlClient.request(HighlightsDocument, { language }),
  })
}
