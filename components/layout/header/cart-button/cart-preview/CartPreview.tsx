'use client';

import { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';

import { useClickOutside } from 'hooks/useClickOutside';

import { CartFieldsFragment } from '@/types/queries/queries';

import { CartPreviewItem } from './cart-preview-item/CartPreviewItem';

interface CartPreviewProps {
  cartSession: CartFieldsFragment;
  setOpenCartPreview: Dispatch<SetStateAction<boolean>>;
}

const CartPreview: React.FC<CartPreviewProps> = (props) => {
  const { cartSession, setOpenCartPreview } = props;

  useClickOutside({
    elementId: 'cart_preview',
    onOutsideClick: () => setOpenCartPreview(false),
  });

  return (
    <div
      id='cart_preview'
      className='absolute right-0 top-16 flex h-96 w-80 flex-col gap-4 border border-black bg-white p-4 cursor-auto'>
      {cartSession.totalQuantity > 0 ? (
        <>
          <div className='flex flex-col gap-4 h-full overflow-auto overscroll-contain'>
            {cartSession.lines.nodes.map((entry, index: number) => (
              <CartPreviewItem key={index} {...entry} />
            ))}
          </div>
          <Link
            href='/checkout'
            className='mt-auto flex w-full items-center justify-center border border-black bg-black p-4 text-base font-bold uppercase text-white transition-all duration-200 hover:bg-white hover:text-black'>
            Checkout
          </Link>
        </>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-3xl font-bold uppercase'>
            Your cart <br /> is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
