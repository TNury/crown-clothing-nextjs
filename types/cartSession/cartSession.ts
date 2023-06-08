import type { Cart } from '@/services/graphql-types/schema-types';

export interface CartSession extends Pick<Cart, 'id' | 'totalQuantity'> {
  cost: Pick<Cart['cost'], 'totalAmount' | 'subtotalAmount'>;

  lines: {
    nodes: Array<
      Pick<Cart['lines']['nodes'][0], 'attribute' | 'merchandise' | 'quantity'>
    >;
  };
}
