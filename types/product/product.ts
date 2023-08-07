import { CategorySlugQuery } from '@/types/queries/queries';

export type ProductDataProps =
  CategorySlugQuery['collectionByHandle']['products']['nodes'][0];
