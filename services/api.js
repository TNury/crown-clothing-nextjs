import axios from 'axios';

import { gql } from 'graphql-tag';

import { readFileSync } from 'fs';

import { print } from 'graphql/language/printer';

import returnApiResponseData from '@/utils/misc/returnApiResponseData';

const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  timeout: 10000,
  headers: {
    'X-Shopify-Storefront-Access-Token': `${process.env.API_KEY}`,
  },
});

async function fetchFromAPI(queryPath, queryName, queryVariables) {
  const queries = readFileSync(queryPath, 'utf-8');

  const query = gql`
    ${queries}
  `.definitions.find((definition) => definition.name.value === queryName);

  const objectToSend = {
    query: print(query),
  };

  if (queryVariables) {
    objectToSend.variables = queryVariables;
  }

  const response = await api.post('/', objectToSend);

  return returnApiResponseData(response);
}

export default fetchFromAPI;
