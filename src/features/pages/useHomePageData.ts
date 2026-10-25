import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { gqlClient } from '@/graphql/client'
import { HomePageDataDocument } from '@/graphql/generated/graphql'
import { useWpLanguage } from '@/shared/hooks/useWpLanguage'

import { findPageByCanonicalSlug } from './findPageByCanonicalSlug'

/**
 * Everything the homepage shows — its hero page, upcoming events, and the
 * latest activities and blog posts — fetched in a single request.
 *
 * The response also seeds the cache entries the dedicated hooks use
 * (`usePage`, `useEvents`, `useSectionPosts`), so navigating from the homepage
 * to About, Events, Activities or Blog renders from cache with no wait.
 */
export function useHomePageData() {
  const language = useWpLanguage()

  const query = useQuery({
    queryKey: ['home-page-data', language],
    queryFn: async ({ client: queryClient }) => {
      const data = await gqlClient.request(HomePageDataDocument, {
        language,
        activitiesCategory: 'activities',
        blogCategory: 'blog',
      })
      queryClient.setQueryData(['site-pages', language], { pages: data.pages })
      queryClient.setQueryData(['events', language], { events: data.events })
      queryClient.setQueryData(['sectionPosts', 'activities', language], { posts: data.activities })
      queryClient.setQueryData(['sectionPosts', 'blog', language], { posts: data.blog })
      return data
    },
  })

  const homePage = useMemo(
    () => findPageByCanonicalSlug(query.data?.pages?.nodes, 'home'),
    [query.data?.pages?.nodes]
  )

  return {
    homePage,
    events: query.data?.events?.nodes ?? [],
    latestActivities: (query.data?.activities?.nodes ?? []).slice(0, 3),
    latestPosts: (query.data?.blog?.nodes ?? []).slice(0, 3),
    isLoading: query.isLoading,
  }
}
