import { CategorySlugCollectionQuery } from '../queries/queries';

export type ProductDataProps =
  CategorySlugCollectionQuery['collectionByHandle']['products']['nodes'][0];
