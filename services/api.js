import axios from 'axios';

import { print } from 'graphql/language/printer';

import returnApiResponseData from '@/utils/misc/returnApiResponseData';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 10000,
  headers: {
    'X-Shopify-Storefront-Access-Token': `${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

async function fetchFromAPI(queryPath, queryName, queryVariables) {
  const queryModule = await import(`${queryPath}`);

  const queryDefinition = queryModule.definitions.find(
    (definition) => definition.name.value === queryName
  );

  const objectToSend = {
    query: print(queryDefinition),
  };

  if (queryVariables) {
    objectToSend.variables = queryVariables;
  }

  const response = await api.post('/', objectToSend);

  return returnApiResponseData(response);
}

export default fetchFromAPI;
