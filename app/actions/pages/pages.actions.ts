'use server';

import callAPI from '@/services/api';

import {
  CategorySlugCollectionResponse,
  CategorySlugParamsResponse,
  GetProductSlugResponse,
} from '@/types/pages/pages.types';

export async function getCategorySlugParams(): Promise<
  CategorySlugParamsResponse['collections']['nodes']
> {
  const response: CategorySlugParamsResponse = await callAPI(
    'CategorySlugParams',
    null,
    { cache: 'no-cache' }
  );

  return response.collections.nodes;
}

export async function getCategorySlug(
  slug: string
): Promise<CategorySlugCollectionResponse['collectionByHandle']> {
  const response: CategorySlugCollectionResponse = await callAPI(
    'CategorySlug',
    {
      handle: slug,
    },
    {
      cache: 'no-cache',
    }
  );

  return response.collectionByHandle;
}

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
