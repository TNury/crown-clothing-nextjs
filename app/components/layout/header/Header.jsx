'use client';

import { useState } from 'react';

import Link from 'next/link';

import CartPreview from '@/components/CartPreview';

export const Header = ({ userSession, cartSession }) => {
  const [openCartPreview, setOpenCartPreview] = useState(false);

  const toggleCartPreview = () => {
    setOpenCartPreview(!openCartPreview);
  };

  const handleSignOutClick = () => {
    // signOutUser();
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
        {userSession.accessToken ? (
          <button
            onClick={handleSignOutClick}
            className='cursor-pointer p-2 text-base'
          >
            SIGN OUT
          </button>
        ) : (
          <Link href='/auth' className='cursor-pointer p-2 text-base'>
            SIGN IN
          </Link>
        )}
        <button
          onClick={toggleCartPreview}
          className='relative flex cursor-pointer items-center justify-center p-2'
        >
          <img
            src='/assets/shopping-bag.svg'
            alt='bag_icon'
            className='h-6 w-6'
          />
          <span className='absolute top-4 text-[10px] font-bold'>
            {cartSession.totalQuantity}
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
