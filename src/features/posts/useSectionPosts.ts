import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { gqlClient } from '@/graphql/client'
import { SectionPostsDocument, SectionPostsSignalDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

export function useSectionPosts(categorySlug: string) {
  const language = useWpLanguage()
  const queryClient = useQueryClient()
  const queryKey = ['sectionPosts', categorySlug, language]

  const query = useQuery({
    queryKey,
    queryFn: () => gqlClient.request(SectionPostsDocument, { language, category: categorySlug }),
  })

  // Cheap poll of just the most-recently-modified post's id/timestamp, so we
  // can detect a new or edited post without repeatedly refetching the full
  // list (with excerpts/images) when nothing has actually changed.
  const { data: signalData } = useQuery({
    queryKey: ['sectionPostsSignal', categorySlug, language],
    queryFn: () =>
      gqlClient.request(SectionPostsSignalDocument, { language, category: categorySlug }),
    refetchInterval: 30 * 1000,
  })

  const latestSignal = signalData?.posts?.nodes[0]
  const previousSignalRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!latestSignal) return
    const signalValue = `${latestSignal.id}:${latestSignal.modified}`
    if (previousSignalRef.current !== undefined && previousSignalRef.current !== signalValue) {
      queryClient.invalidateQueries({ queryKey })
    }
    previousSignalRef.current = signalValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestSignal?.id, latestSignal?.modified])

  return query
}
