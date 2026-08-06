import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from 'react-router'

import i18n from '@/i18n'

import { router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Serve cached data instantly for this long, then treat it as stale.
      // Stale queries still refetch in the background on remount/refocus/reconnect,
      // so content changes on the WordPress side show up without a hard reload.
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

export function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </QueryClientProvider>
  )
}
