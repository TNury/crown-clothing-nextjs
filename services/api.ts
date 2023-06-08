import axios from 'axios';

import * as mappedQueries from '@/services/queries/generated-query-document-nodes';

import returnApiResponseData from '@/utils/misc/returnApiResponseData';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 10000,
  headers: {
    'X-Shopify-Storefront-Access-Token': `${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

async function callAPI(queryName: string, variables?: Record<string, any>) {
  const query = mappedQueries[queryName].loc.source.body;

  const objectToSend = {
    query,
    variables,
  };

  const response = await api.post('/', objectToSend);

  return returnApiResponseData(response);
}

export default callAPI;
