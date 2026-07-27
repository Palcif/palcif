import { GraphQLClient } from 'graphql-request'

const endpoint = import.meta.env['VITE_WP_GRAPHQL_URL'] as string

export const gqlClient = new GraphQLClient(endpoint)
