import { GraphQLClient } from 'graphql-request'

const endpoint = import.meta.env['VITE_WP_GRAPHQL_URL'] as string

// GET (not POST) so Cloudflare and WPGraphQL Smart Cache's network cache can
// cache and serve responses instead of every request hitting WordPress.
export const gqlClient = new GraphQLClient(endpoint, { method: 'GET' })
