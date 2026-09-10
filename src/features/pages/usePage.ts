import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { SitePagesDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

import { findPageByCanonicalSlug } from './findPageByCanonicalSlug'

/**
 * A fixed-route WordPress page (`about`, `contact`) for the language being
 * viewed. `canonicalSlug` is always the English slug; the query fetches the
 * language's pages and `findPageByCanonicalSlug` resolves the translation,
 * because the Polylang `where` filter can't be trusted to narrow by both
 * language and slug at once.
 */
export function usePage(canonicalSlug: string) {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['site-pages', language],
    queryFn: () => gqlClient.request(SitePagesDocument, { language }),
    select: (data) => {
      const page = findPageByCanonicalSlug(data.pages?.nodes, canonicalSlug)
      return { ...data, pages: { nodes: page ? [page] : [] } }
    },
  })
}
