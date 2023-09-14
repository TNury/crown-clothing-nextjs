'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/generic/button/Button';

import { createCheckout } from '@/actions/checkout/checkout.actions';

import { CartSessionProps } from '@/types/cart/cart.types';

type CheckoutButtonProps = {
  cartSession: CartSessionProps;
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cartSession }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleCheckoutButtonClick = async () => {
    setLoading(true);

    const response = await createCheckout({
      lineItems: cartSession.lines.nodes.map((lineNode) => ({
        quantity: lineNode.quantity,
        variantId: lineNode.merchandise.id,
      })),
    });

    if (response.lineItems.nodes[0]) {
      router.push('/delivery');
    } else {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleCheckoutButtonClick}
      className='flex items-center justify-between'>
      <p className='text-base'>Checkout</p>
      <span className='h-8 text-lg'>&#8594;</span>
    </Button>
  );
};

export default CheckoutButton;
