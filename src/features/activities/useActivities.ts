import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { ActivitiesDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useActivities() {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['activities', language],
    queryFn: () => gqlClient.request(ActivitiesDocument, { language }),
  })
}
