'use server';

import callAPI from '@/services/api';

import { storeCookie } from '@/actions/cookies/cookies';

import { CartAdditionResponse, CartCreationResponse } from '@/types/cart/cart.types';

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

export async function addItemToCart(
  cartId: string,
  merchandiseId: string
): Promise<CartCreationResponse['cartCreate']['cart']> {
  const response: CartAdditionResponse = await callAPI(
    'AddItemToCart',
    {
      cartId,
      quantity: 1,
      merchandiseId,
    },
    {
      cache: 'no-cache',
    }
  );

  storeCookie('cartSession', response.cartLinesAdd.cart);

  return response.cartLinesAdd.cart;
}
