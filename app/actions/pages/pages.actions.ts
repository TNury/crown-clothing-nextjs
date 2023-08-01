'use server';

import callAPI from '@/services/api';

import { GetProductSlugResponse } from '@/types/pages/pages.types';

export async function getProductSlug(
  slug: string
): Promise<GetProductSlugResponse['productByHandle']> {
  const response: GetProductSlugResponse = await callAPI(
    'ProductSlug',
    {
      handle: slug,
    },
    {
      cache: 'no-cache',
    }
  );

  return response.productByHandle;
}
