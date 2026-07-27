import type { CodegenConfig } from '@graphql-codegen/client-preset'

const config: CodegenConfig = {
  schema: process.env['VITE_WP_GRAPHQL_URL'],
  documents: ['src/graphql/queries/**/*.graphql'],
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
