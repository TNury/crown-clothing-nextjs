'use server';

import callAPI from '@/services/api';

import {
  CategorySlugCollectionResponse,
  CategorySlugParamsResponse,
  GetProductSlugParamsResponse,
  GetProductSlugResponse,
  HomePageResponse,
  ShopPageResponse,
} from '@/types/pages/pages.types';

export async function getHomePage(): Promise<
  HomePageResponse['collections']['nodes']
> {
  const response: HomePageResponse = await callAPI('HomePage', null, {
    cache: 'no-cache',
  });

  return response.collections.nodes;
}

export async function getShopPage(): Promise<
  ShopPageResponse['collections']['nodes']
> {
  const response: ShopPageResponse = await callAPI('ShopPage', null, {
    cache: 'no-cache',
  });

  return response.collections.nodes;
}

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
