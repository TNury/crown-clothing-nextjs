import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://nextjs13-crown-clothing.myshopify.com/api/2023-04/graphql.json': {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_API_KEY,
      },
    },
  },
  documents: 'services/queries/*.graphql',
  generates: {
    'services/graphql-types/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
