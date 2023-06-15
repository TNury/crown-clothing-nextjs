import * as mappedQueries from '@/services/queries/generated-query-document-nodes';

async function callAPI(
  queryName: string,
  variables?: Record<string, any>
): Promise<any> {
  const query = mappedQueries[queryName].loc.source.body;

  const objectToSend = {
    query,
    variables,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(objectToSend),
  };

  const rawResponse = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL,
    requestOptions
  );

  const parsedResponse = await rawResponse.json();

  return parsedResponse.data;
}

export default callAPI;
