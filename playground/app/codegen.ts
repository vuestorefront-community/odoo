import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'https://vsfdemo15.labs.odoogap.com/graphql/vsf': {
      },
    },
  ],
  ignoreNoDocuments: true,
  generates: {
    './graphql/gql/': {
      documents: ['graphql/**/*.tsx'],
      preset: 'client'
    },
  },
}

export default config
