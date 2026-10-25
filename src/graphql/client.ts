import { GraphQLClient } from 'graphql-request'

// Same-origin `/graphql` is served by the Cloudflare Worker (worker/index.ts),
// which proxies WordPress and caches responses at the edge with
// stale-while-revalidate. GET (not POST) so those responses are cacheable.
export const gqlClient = new GraphQLClient(new URL('/graphql', window.location.origin).toString(), {
  method: 'GET',
})
