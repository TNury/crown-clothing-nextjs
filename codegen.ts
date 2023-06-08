import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      'https://nextjs13-crown-clothing.myshopify.com/api/2023-04/graphql.json':
        {
          headers: {
            'X-Shopify-Storefront-Access-Token':
              process.env.NEXT_PUBLIC_API_KEY,
          },
        },
    },
  ],
  documents: 'services/queries/*.graphql',
  generates: {
    './types/queries/queries.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    './services/queries/generated-query-document-nodes.ts': {
      plugins: ['typescript-document-nodes'],
    },
  },
};

export default config;
