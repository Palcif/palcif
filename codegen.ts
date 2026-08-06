import type { CodegenConfig } from '@graphql-codegen/client-preset'

const config: CodegenConfig = {
  schema: './schema.graphql',
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
