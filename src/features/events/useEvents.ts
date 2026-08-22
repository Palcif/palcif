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
  // An event with no (or unparseable) date has nothing to compare against
  // "now", so it can't be past — treat it as upcoming (sorted after every
  // dated event) rather than silently dropping it from both lists.
  const isUpcoming = (event: T) => {
    const time = getTime(event)
    return Number.isNaN(time) || time >= now
  }
  return {
    upcoming: events.filter(isUpcoming).sort((a, b) => {
      const timeA = getTime(a)
      const timeB = getTime(b)
      return (Number.isNaN(timeA) ? Infinity : timeA) - (Number.isNaN(timeB) ? Infinity : timeB)
    }),
    past: events.filter((event) => !isUpcoming(event)).sort((a, b) => getTime(b) - getTime(a)),
  }
}
