'use client';

import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Link from 'next/link';

import { CartSessionProps } from '@/types/cart/cart';

interface CartPreviewProps {
  cartSession: CartSessionProps;
  setOpenCartPreview: Dispatch<SetStateAction<boolean>>;
}

const CartPreview: React.FC<CartPreviewProps> = (props) => {
  const { cartSession, setOpenCartPreview } = props;

  const handleOnBlur = useCallback((event: MouseEvent): void => {
    const cartPreviewRef = document.getElementById('cart_preview');

    if (!cartPreviewRef?.contains(event.target as Node)) {
      setOpenCartPreview(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('click', handleOnBlur);
    }, 100);

    return () => {
      window.removeEventListener('click', handleOnBlur);
    };
  }, []);

  return (
    <div
      id='cart_preview'
      className='absolute right-0 top-20 flex h-96 w-60 flex-col gap-4 border border-black bg-white p-4'>
      {cartSession.totalQuantity > 0 ? (
        <>
          <div className='flex flex-col gap-4 overflow-auto overscroll-contain'>
            {cartSession.lines.nodes.map((entry: any, index: number) => (
              <div key={index} className='flex h-20 w-full'>
                <img
                  src={entry.merchandise.image.url}
                  className='h-full w-1/3 object-cover'
                />
                <div className='p-4 text-left'>
                  <p>{entry.merchandise.product.title}</p>
                  <p>{entry.quantity} x €11</p>
                </div>
              </div>
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
