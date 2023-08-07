import {
  AddItemToCartMutation,
  CartFieldsFragment,
  CreateCartMutation,
} from '@/types/queries/queries';

export type CartCreationResponse = CreateCartMutation;

export type CartAdditionResponse = AddItemToCartMutation;

export type CartSessionProps = CartFieldsFragment;

export type CartItemProps = CartFieldsFragment['lines']['nodes'][0];
