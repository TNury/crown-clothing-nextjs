'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/generic/button/Button';

import { triggerItemAddition } from '@/actions/cart/cart';

import { ProductDataProps } from '@/types/product/product';

type AddToCartProps = {
  productData: ProductDataProps;
};

const AddToCart: React.FC<AddToCartProps> = ({ productData }) => {
  const router = useRouter();

  const handleClick = async (): Promise<void> => {
    await triggerItemAddition(productData);

    setTimeout(() => {
      router.refresh();
    }, 1);
  };

  return (
    <Button type='submit' onClick={handleClick}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
