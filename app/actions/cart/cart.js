'use server';

import callAPI from '@/services/api';

import { retrieveCookie, storeCookie } from '@/actions/cookies/cookies';

export async function triggerItemAddition(productData) {
  const merchandiseId = productData.variants.nodes[0].id;

  const existingCartSession = await retrieveCookie('cartSession');

  if (!existingCartSession) {
    const response = await callAPI(
      'services/queries/cart.graphql',
      'createCart',
      {
        quantity: 1,
        merchandiseId,
      }
    );

    storeCookie('cartSession', response.cartCreate.cart);
  } else {
    const response = await callAPI(
      'services/queries/cart.graphql',
      'addItemToCart',
      {
        cartId: existingCartSession.id,
        quantity: 1,
        merchandiseId,
      }
    );

    storeCookie('cartSession', response.cartLinesAdd.cart);
  }
}
