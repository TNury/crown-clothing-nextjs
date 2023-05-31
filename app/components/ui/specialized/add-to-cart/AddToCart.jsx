'use client';

import { triggerItemAddition } from '@/actions/cart/cart';

import { Button } from '@/components/ui/generic/button/Button';

const AddToCart = ({ productData }) => {
  return (
    <Button type='submit' onClick={() => triggerItemAddition(productData)}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
