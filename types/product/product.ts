import { CategorySlugQuery } from '../queries/queries';

export type ProductDataProps =
  CategorySlugQuery['collectionByHandle']['products']['nodes'][0];
