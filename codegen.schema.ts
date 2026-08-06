import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env['VITE_WP_GRAPHQL_URL'],
  generates: {
    './schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
}

export default config
