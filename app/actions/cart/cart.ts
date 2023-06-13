'use server';

import callAPI from '@/services/api';

import { retrieveCookie, storeCookie } from '@/actions/cookies/cookies';

import { ProductDataProps } from '@/types/product/product';

export async function triggerItemAddition(
  productData: ProductDataProps
): Promise<void> {
  const merchandiseId = productData.variants.nodes[0].id;

  const existingCartSession = await retrieveCookie('cartSession');

  if (!existingCartSession) {
    const response = await callAPI('CreateCart', {
      quantity: 1,
      merchandiseId,
    });

    storeCookie('cartSession', response.cartCreate.cart);
  } else {
    const response = await callAPI('AddItemToCart', {
      cartId: existingCartSession.id,
      quantity: 1,
      merchandiseId,
    });

    storeCookie('cartSession', response.cartLinesAdd.cart);
  }
}
