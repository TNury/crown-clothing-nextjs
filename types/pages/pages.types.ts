import {
  CategorySlugParamsQuery,
  CategorySlugQuery,
  HomePageQuery,
  ProductSlugParamsQuery,
  ProductSlugQuery,
  ShopPageQuery,
} from '@/types/queries/queries';

export type GetHomePageResponse = HomePageQuery;

export type GetShopPageResponse = ShopPageQuery;

export type GetCategorySlugParamsResponse = CategorySlugParamsQuery;

export type GetCategorySlugCollectionResponse = CategorySlugQuery;

export type GetProductSlugParamsResponse = ProductSlugParamsQuery;

export type GetProductSlugResponse = ProductSlugQuery;
