'use server';

import callAPI from '@/services/api';

import {
  GetCategorySlugParamsResponse,
  GetCategorySlugCollectionResponse,
  GetProductSlugParamsResponse,
  GetProductSlugResponse,
  GetHomePageResponse,
  GetShopPageResponse,
} from '@/types/pages/pages.types';

export async function getHomePage(): Promise<
  GetHomePageResponse['collections']['nodes']
> {
  const response: GetHomePageResponse = await callAPI('HomePage', null, {
    cache: 'no-cache',
  });

  return response.collections.nodes;
}

export async function getShopPage(): Promise<
  GetShopPageResponse['collections']['nodes']
> {
  const response: GetShopPageResponse = await callAPI('ShopPage', null, {
    cache: 'no-cache',
  });

  return response.collections.nodes;
}

export async function getCategorySlugParams(): Promise<
  GetCategorySlugParamsResponse['collections']['nodes']
> {
  const response: GetCategorySlugParamsResponse = await callAPI(
    'CategorySlugParams',
    null,
    { cache: 'no-cache' }
  );

  return response.collections.nodes;
}

export async function getCategorySlug(
  slug: string
): Promise<GetCategorySlugCollectionResponse['collectionByHandle']> {
  const response: GetCategorySlugCollectionResponse = await callAPI(
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

export async function getProductSlugParams(): Promise<
  GetProductSlugParamsResponse['collections']['nodes']
> {
  const response: GetProductSlugParamsResponse = await callAPI(
    'ProductSlugParams',
    null,
    { cache: 'no-cache' }
  );

  return response.collections.nodes;
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
