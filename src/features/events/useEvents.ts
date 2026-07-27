import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { EventsDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useEvents() {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['events', language],
    queryFn: () => gqlClient.request(EventsDocument, { language }),
  })
}

export function splitEventsByDate<T extends { eventsFields: { eventdate: string | null } | null }>(
  events: T[]
) {
  const now = Date.now()
  const getTime = (event: T) => {
    const eventdate = event.eventsFields?.eventdate
    return eventdate ? new Date(eventdate).getTime() : NaN
  }
  return {
    upcoming: events
      .filter((event) => getTime(event) >= now)
      .sort((a, b) => getTime(a) - getTime(b)),
    past: events.filter((event) => getTime(event) < now).sort((a, b) => getTime(b) - getTime(a)),
  }
}
