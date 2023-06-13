'use client';

import { Button } from '@/components/ui/generic/button/Button';

import { triggerItemAddition } from '@/actions/cart/cart';

import { ProductDataProps } from '@/types/product/product';

type AddToCartProps = {
  productData: ProductDataProps;
};

const AddToCart: React.FC<AddToCartProps> = ({ productData }) => {
  return (
    <Button type='submit' onClick={() => triggerItemAddition(productData)}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
