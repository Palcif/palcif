import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from 'react-router'

import i18n from '@/i18n'
import { ImageLightboxProvider } from '@/shared/context/ImageLightboxContext'

import { router } from './router'

const CACHE_MAX_AGE = 24 * 60 * 60 * 1000

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Serve cached data instantly for this long, then treat it as stale.
      // Stale queries still refetch in the background on remount/refocus/reconnect,
      // so content changes on the WordPress side show up without a hard reload.
      // Kept short since there's no longer a Cloudflare purge on post save —
      // this is what bounds how long an edit takes to appear on refocus/reconnect.
      staleTime: 60 * 1000,
      // Must be at least the persister's maxAge, or restored entries are
      // garbage-collected before they can be shown.
      gcTime: CACHE_MAX_AGE,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

// Persist the cache so a returning visitor sees the last content instantly;
// stale entries then refresh in the background. localStorage can be missing or
// throw (private windows, blocked site data), in which case persistence is off.
function findStorage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

const queryCachePersister = createAsyncStoragePersister({
  storage: findStorage(),
  key: 'palcif-query-cache',
})

export function Providers() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryCachePersister,
        maxAge: CACHE_MAX_AGE,
        // A new build drops the old cache so a changed data shape can't be restored.
        buster: __BUILD_ID__,
      }}
    >
      <I18nextProvider i18n={i18n}>
        <ImageLightboxProvider>
          <RouterProvider router={router} />
        </ImageLightboxProvider>
      </I18nextProvider>
    </PersistQueryClientProvider>
  )
}
