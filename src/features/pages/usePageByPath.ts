import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { gqlClient } from '@/graphql/client'
import { PageContentDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

import { resolvePageMatch } from './resolvePageMatch'

/**
 * Resolve an arbitrary WordPress page from a visited site path
 * (`thenakbah`, `about/history`), for the current Polylang language.
 *
 * The query filters by the path's last segment — the page's own slug — which
 * is the connection filter the Polylang bridge understands; `resolvePageMatch`
 * then confirms the full hierarchy against each candidate's `uri`.
 */
export function usePageByPath(requestedPath: string) {
  const language = useWpLanguage()
  const slug = requestedPath.split('/').filter(Boolean).at(-1) ?? ''

  const query = useQuery({
    queryKey: ['page-by-path', slug, language],
    queryFn: () => gqlClient.request(PageContentDocument, { language, slug }),
    enabled: slug !== '',
  })

  // Memoised so `match` (and the page node inside it) keeps a stable identity
  // across renders — consumers feed `match.page.translations` into an effect.
  const match = useMemo(
    () => resolvePageMatch(requestedPath, query.data?.pages?.nodes),
    [requestedPath, query.data?.pages?.nodes]
  )

  return { match, isLoading: query.isLoading, isError: query.isError }
}
