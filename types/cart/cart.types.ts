import {
  AddItemToCartMutation,
  CartFieldsFragment,
  CreateCartMutation,
  RemoveCartItemMutation,
  RemoveCartItemMutationVariables,
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables,
} from '@/types/queries/queries';

export type CartCreationResponse = CreateCartMutation;

export type CartAdditionResponse = AddItemToCartMutation;

export type CartItemUpdateInput = UpdateCartItemMutationVariables;

export type CartItemUpdateResponse = UpdateCartItemMutation;

export type CartItemRemoveInput = RemoveCartItemMutationVariables;

export type CartItemRemoveResponse = RemoveCartItemMutation;

export type CartSessionProps = CartFieldsFragment;

export type CartItemProps = CartFieldsFragment['lines']['nodes'][0];
