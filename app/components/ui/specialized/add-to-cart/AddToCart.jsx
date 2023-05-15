'use client';

import callAPI from '@services/api';

import { Button } from '@/components/ui/generic/button/Button';

const AddToCart = ({ productData }) => {
  const triggerItemAddition = async () => {
    const merchandiseId = productData.variants.nodes[0].id;

    const response = await callAPI(
      'services/queries/cart.graphql',
      'createCart',
      {
        quantity: 1,
        merchandiseId,
      }
    );
  };

  return <Button onClick={triggerItemAddition}>Add to cart</Button>;
};

export default AddToCart;
