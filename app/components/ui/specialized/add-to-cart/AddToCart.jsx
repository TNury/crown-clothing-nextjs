import { cookies } from 'next/headers';

import callAPI from '@services/api';

import { Button } from '@/components/ui/generic/button/Button';

/*
  Current problem:

  When we call triggerItemAddition on /shop/categorySlug,
  we get a 405 error. It works no shop/.

  The reason why this is happening is due to generate static params
*/
const AddToCart = ({ productData }) => {
  async function triggerItemAddition(arg) {
    'use server';

    // If you're trying to iterate through an object defined outside
    // the scope of the server action, you need to access it like this.
    const merchandiseId = productData['variants']['nodes'][0]['id'];

    const response = await callAPI(
      'services/queries/cart.graphql',
      'createCart',
      {
        quantity: 1,
        merchandiseId,
      }
    );

    cookies().set('cartId', response.cartCreate.cart.id, { secure: true });
  }

  return (
    <form action={triggerItemAddition}>
      <Button type='submit'>Add to cart</Button>
    </form>
  );
};

export default AddToCart;
