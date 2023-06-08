'use client';

import { useState } from 'react';

import Link from 'next/link';

import CartPreview from '@/components/layout/header/cart-preview/CartPreview';

import { AuthButton } from './auth-button/AuthButton';

export const Header = ({ userSession, cartSession }) => {
  const [openCartPreview, setOpenCartPreview] = useState(false);

  const toggleCartPreview = () => {
    setOpenCartPreview(!openCartPreview);
  };

  return (
    <header className='fixed top-0 z-20 flex h-20 w-full items-center justify-between bg-white pl-4 md:pl-16 md:pr-14'>
      <Link href='/'>
        <img src='/assets/logo.svg' alt='brand_logo' className='h-14 w-14' />
      </Link>
      <div className='flex items-center gap-2'>
        <Link href='/shop' className='cursor-pointer p-2 text-base'>
          SHOP
        </Link>
        <AuthButton userSession={userSession} />
        <button
          onClick={toggleCartPreview}
          className='relative flex cursor-pointer items-center justify-center p-2'>
          <img
            src='/assets/shopping-bag.svg'
            alt='bag_icon'
            className='h-6 w-6'
          />
          <span className='absolute top-4 text-[10px] font-bold'>
            {cartSession.totalQuantity ? cartSession.totalQuantity : 0}
          </span>
        </button>
      </div>
      {openCartPreview && (
        <CartPreview
          cartSession={cartSession}
          setOpenCartPreview={setOpenCartPreview}
        />
      )}
    </header>
  );
};
