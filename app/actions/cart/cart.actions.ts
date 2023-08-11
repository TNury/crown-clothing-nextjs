'use server';

import callAPI from '@/services/api';

import { storeCookie } from '@/actions/cookies/cookies';

import {
  CartAdditionResponse,
  CartCreationResponse,
  CartItemRemoveInput,
  CartItemRemoveResponse,
  CartItemUpdateInput,
  CartItemUpdateResponse,
} from '@/types/cart/cart.types';

/**
 * Creates a new cart with the given merchandise ID.
 * @param merchandiseId The ID of the merchandise to add to the cart.
 * @returns A Promise that resolves to the created cart.
 */
export async function createCart(
  merchandiseId: string
): Promise<CartCreationResponse['cartCreate']['cart']> {
  const response: CartCreationResponse = await callAPI(
    'CreateCart',
    {
      quantity: 1,
      merchandiseId,
    },
    {
      cache: 'no-cache',
    }
  );

  storeCookie('cartSession', response.cartCreate.cart);

  return response.cartCreate.cart;
}

/**
 * Adds an item to the cart.
 * @param cartId - The ID of the cart.
 * @param merchandiseId - The ID of the merchandise to add to the cart.
 * @returns A Promise that resolves with the updated cart object.
 */
export async function addItemToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number = 1
): Promise<CartCreationResponse['cartCreate']['cart']> {
  const response: CartAdditionResponse = await callAPI(
    'AddItemToCart',
    {
      cartId,
      quantity,
      merchandiseId,
    },
    {
      cache: 'no-cache',
    }
  );

  storeCookie('cartSession', response.cartLinesAdd.cart);

  return response.cartLinesAdd.cart;
}

export async function updateCartItem(
  cartItemUpdateInput: CartItemUpdateInput
): Promise<CartItemUpdateResponse> {
  const response: CartItemUpdateResponse = await callAPI(
    'UpdateCartItem',
    cartItemUpdateInput,
    {
      cache: 'no-cache',
    }
  );

  storeCookie('cartSession', response.cartLinesUpdate.cart);

  return response;
}

export async function removeCartItem(
  cartItemRemoveInput: CartItemRemoveInput
): Promise<CartItemRemoveResponse> {
  const response: CartItemRemoveResponse = await callAPI(
    'RemoveCartItem',
    cartItemRemoveInput,
    {
      cache: 'no-cache',
    }
  );

  storeCookie('cartSession', response.cartLinesRemove.cart);

  return response;
}
