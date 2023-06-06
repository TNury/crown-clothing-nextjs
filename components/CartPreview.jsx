'use client';

import Link from 'next/link';

import { useCallback, useEffect } from 'react';

const CartPreview = ({ cartSession, setOpenCartPreview }) => {
  const handleOnBlur = useCallback((event) => {
    const cartPreviewRef = document.getElementById('cart_preview');

    if (!cartPreviewRef.contains(event.target)) {
      setOpenCartPreview(false);
    }
  }, []);

  useEffect(() => {
    // Timeout to prevent handleBlur from being triggered
    // immediately after comp is rendered.
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
      className='absolute right-14 top-20 flex h-96 w-60 flex-col gap-4 border border-black bg-white p-4'
    >
      {cartSession.totalQuantity > 0 ? (
        <>
          <div className='flex flex-col gap-4 overflow-auto overscroll-contain'>
            {cartSession.lines.nodes.map((entry, index) => (
              <div key={index} className='flex h-20 w-full'>
                <img
                  src={entry.merchandise.image.url}
                  className='h-full w-1/3 object-cover'
                />
                <div className='p-4'>
                  <p>{entry.merchandise.product.title}</p>
                  <p>{entry.quantity} x €11</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href='/checkout'
            className='mt-auto flex w-full items-center justify-center border border-black bg-black p-4 text-base font-bold uppercase text-white transition-all duration-200 hover:bg-white hover:text-black'
          >
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