'use client';

import { useState } from 'react';

import { CartFieldsFragment } from '@/types/queries/queries';

import CartPreview from './cart-preview/CartPreview';

type CartButtonProps = {
  cartSession: CartFieldsFragment;
};

export const CartButton: React.FC<CartButtonProps> = ({ cartSession }) => {
  const [openCartPreview, setOpenCartPreview] = useState<boolean>(false);

  const toggleCartPreview = (): void => {
    setOpenCartPreview(!openCartPreview);
  };

  return (
    <button
      onClick={toggleCartPreview}
      className='relative flex cursor-pointer items-center justify-center p-2'>
      <img src='/assets/shopping-bag.svg' alt='bag_icon' className='h-6 w-6' />
      <span className='absolute top-4 text-[10px] font-bold'>
        {cartSession.totalQuantity ? cartSession.totalQuantity : 0}
      </span>
      {openCartPreview && (
        <CartPreview
          cartSession={cartSession}
          setOpenCartPreview={setOpenCartPreview}
        />
      )}
    </button>
  );
};
