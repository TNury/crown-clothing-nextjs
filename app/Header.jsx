'use client';

import { useState, useCallback, useEffect } from 'react';

import Link from 'next/link';

import Image from 'next/image';
import CartPreview from './CartPreview';
import { useSelector } from 'react-redux';

export const Header = () => {
  const cartProps = useSelector((state) => state.cart);

  const [openCartPreview, setOpenCartPreview] = useState(false);

  const toggleCartPreview = () => {
    setOpenCartPreview(!openCartPreview);
  };

  return (
    <header className='pl-4 w-full h-20 flex items-center justify-between fixed top-0 z-20 bg-white md:pl-16 md:pr-14'>
      <Link href='/'>
        <Image src='/assets/logo.svg' width={50} height={50} alt='brand_logo' />
      </Link>
      <div className='flex gap-2 items-center'>
        <Link href='/shop' className='p-2 text-base cursor-pointer'>
          SHOP
        </Link>
        <a className='p-2 text-base cursor-pointer'>SIGN IN</a>
        <button
          onClick={toggleCartPreview}
          className='p-2 cursor-pointer flex items-center justify-center relative'
        >
          <Image
            src='/assets/shopping-bag.svg'
            width={24}
            height={24}
            alt='bag_icon'
          />
          <span className='text-[10px] font-bold absolute top-4'>
            {cartProps.itemsQuantity}
          </span>
        </button>
      </div>
      {openCartPreview && (
        <CartPreview
          cartItems={cartProps.items}
          setOpenCartPreview={setOpenCartPreview}
        />
      )}
    </header>
  );
};
