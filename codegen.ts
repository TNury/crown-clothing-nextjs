import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

function returnSchema() {
  const schemaURL = process.env.BACKEND_URL;

  let schema = {};

  schema[schemaURL] = {
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.API_KEY,
    },
  };

  return [schema];
}

const config: CodegenConfig = {
  schema: returnSchema(),
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
