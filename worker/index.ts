interface Environment {
  /** Absolute URL of the WordPress WPGraphQL endpoint, set under `vars` in wrangler.jsonc. */
  WP_GRAPHQL_URL: string
  ASSETS: Fetcher
}

const GRAPHQL_PATH = '/graphql'

/** How long a cached response is served without asking WordPress again. */
const FRESH_SECONDS = 60
/**
 * How long a response may still be served (instantly) after going stale while
 * a fresh copy is fetched in the background. Bounds how out of date a visitor
 * can be when WordPress is slow or unreachable.
 */
const STALE_SECONDS = 24 * 60 * 60

const CACHED_AT_HEADER = 'x-edge-cached-at'
const CACHE_STATUS_HEADER = 'x-edge-cache'

type CacheStatus = 'HIT' | 'STALE' | 'MISS'

/**
 * Tag the response with its cache status and set what browsers may do with it.
 * The stored copy carries a day-long max-age for Cloudflare's benefit, which
 * must never reach browsers: they could then reuse it for a day without asking
 * the Worker again.
 */
function withCacheStatus(
  response: Response,
  status: CacheStatus,
  browserMaxAgeSeconds: number
): Response {
  const annotated = new Response(response.body, response)
  annotated.headers.set(CACHE_STATUS_HEADER, status)
  annotated.headers.set('cache-control', `public, max-age=${browserMaxAgeSeconds}`)
  return annotated
}

function responseHasGraphqlErrors(responseText: string): boolean {
  try {
    const parsedBody: unknown = JSON.parse(responseText)
    return (
      typeof parsedBody === 'object' &&
      parsedBody !== null &&
      'errors' in parsedBody &&
      Boolean(parsedBody.errors)
    )
  } catch {
    // Not JSON (e.g. an HTML error page) — never cache it.
    return true
  }
}

/**
 * Fetch from WordPress and, when the result is a clean GraphQL success, store
 * it. GraphQL reports errors with HTTP 200, so the body is checked too —
 * caching a `{"errors": ...}` payload would pin the failure for a day.
 */
async function fetchFromWordPress(
  upstreamUrl: string,
  cacheKey: Request,
  cache: Cache
): Promise<Response> {
  const upstreamResponse = await fetch(upstreamUrl, { headers: { accept: 'application/json' } })
  if (!upstreamResponse.ok) return upstreamResponse

  const responseText = await upstreamResponse.text()
  const headers = new Headers({
    'content-type': upstreamResponse.headers.get('content-type') ?? 'application/json',
    // Browsers may reuse the response briefly; the Worker still revalidates after that.
    'cache-control': `public, max-age=${FRESH_SECONDS}`,
  })
  const response = new Response(responseText, { status: 200, headers })

  if (!responseHasGraphqlErrors(responseText)) {
    const storedResponse = response.clone()
    storedResponse.headers.set(CACHED_AT_HEADER, String(Date.now()))
    // The Cache API honours max-age, so keep the entry alive for the stale window too.
    storedResponse.headers.set('cache-control', `public, max-age=${STALE_SECONDS}`)
    await cache.put(cacheKey, storedResponse)
  }
  return response
}

async function handleGraphqlRequest(
  request: Request,
  environment: Environment,
  executionContext: ExecutionContext
): Promise<Response> {
  const requestUrl = new URL(request.url)
  const hasQuery = requestUrl.searchParams.has('query')
  if (request.method !== 'GET' || !hasQuery) {
    // The app only issues GET queries; anything else (mutations, probes) isn't cacheable.
    return new Response(
      JSON.stringify({ errors: [{ message: 'Only GET queries are supported.' }] }),
      {
        status: 405,
        headers: { 'content-type': 'application/json', allow: 'GET' },
      }
    )
  }

  const upstreamUrl = new URL(environment.WP_GRAPHQL_URL)
  upstreamUrl.search = requestUrl.search

  const cache = caches.default
  const cacheKey = new Request(upstreamUrl.toString(), { method: 'GET' })
  const cachedResponse = await cache.match(cacheKey)

  if (cachedResponse) {
    const cachedAt = Number(cachedResponse.headers.get(CACHED_AT_HEADER) ?? 0)
    const ageSeconds = (Date.now() - cachedAt) / 1000
    if (ageSeconds <= FRESH_SECONDS) {
      return withCacheStatus(cachedResponse, 'HIT', Math.ceil(FRESH_SECONDS - ageSeconds))
    }
    executionContext.waitUntil(
      fetchFromWordPress(upstreamUrl.toString(), cacheKey, cache).catch(() => undefined)
    )
    return withCacheStatus(cachedResponse, 'STALE', 0)
  }

  try {
    return withCacheStatus(
      await fetchFromWordPress(upstreamUrl.toString(), cacheKey, cache),
      'MISS',
      FRESH_SECONDS
    )
  } catch {
    return new Response(JSON.stringify({ errors: [{ message: 'Content service unreachable.' }] }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    })
  }
}

export default {
  async fetch(request, environment, executionContext) {
    const { pathname } = new URL(request.url)
    if (pathname === GRAPHQL_PATH) {
      return handleGraphqlRequest(request, environment, executionContext)
    }
    return environment.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Environment>
