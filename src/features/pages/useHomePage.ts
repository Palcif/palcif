import { useQuery } from '@tanstack/react-query'

import { gqlClient } from '@/graphql/client'
import { SitePagesDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

import { findPageByCanonicalSlug } from './findPageByCanonicalSlug'

/**
 * The homepage's WordPress page: hero copy (`content`) plus its Featured Image,
 * which editors set under Pages > Home to control the hero visual.
 *
 * Shares the `SitePages` query (and its cache) with `usePage`; the homepage is
 * resolved by its English slug so each Polylang translation (`home-ar`,
 * `home-fi`) renders its own hero.
 */
export function useHomePage() {
  const language = useWpLanguage()

  return useQuery({
    queryKey: ['site-pages', language],
    queryFn: () => gqlClient.request(SitePagesDocument, { language }),
    select: (data) => {
      const page = findPageByCanonicalSlug(data.pages?.nodes, 'home')
      return { ...data, pages: { nodes: page ? [page] : [] } }
    },
  })
}
