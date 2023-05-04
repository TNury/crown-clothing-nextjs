import axios from 'axios';

import fs from 'fs';

import returnApiResponseData from '@/utils/misc/returnApiResponseData';

const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  timeout: 10000,
  headers: {
    'X-Shopify-Storefront-Access-Token': `${process.env.API_KEY}`,
  },
});

async function fetchFromAPI(pathToQuery) {
  const query = fs.readFileSync(pathToQuery, 'utf-8');

  const response = await api.post('/', {
    query,
  });

  return returnApiResponseData(response);
}

export default fetchFromAPI;
