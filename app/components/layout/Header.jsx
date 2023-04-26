'use client';

import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signUserOut as clearUserData } from 'redux/user/user.reducer';

import Link from 'next/link';

import CartPreview from '../CartPreview';

import { signOutUser } from '@services/firebase';

export const Header = () => {
  const [openCartPreview, setOpenCartPreview] = useState(false);

  const cartProps = useSelector((state) => state.cart);
  const userToken = useSelector((state) => state.user.currentUser.token);

  const dispatch = useDispatch();

  const toggleCartPreview = () => {
    setOpenCartPreview(!openCartPreview);
  };

  const handleSignOutClick = () => {
    signOutUser();
    dispatch(clearUserData());
  };

  return (
    <header className='pl-4 w-full h-20 flex items-center justify-between fixed top-0 z-20 bg-white md:pl-16 md:pr-14'>
      <Link href='/'>
        <img src='/assets/logo.svg' alt='brand_logo' className='w-14 h-14' />
      </Link>
      <div className='flex gap-2 items-center'>
        <Link href='/shop' className='p-2 text-base cursor-pointer'>
          SHOP
        </Link>
        {userToken ? (
          <button
            onClick={handleSignOutClick}
            className='p-2 text-base cursor-pointer'
          >
            SIGN OUT
          </button>
        ) : (
          <Link href='/auth' className='p-2 text-base cursor-pointer'>
            SIGN IN
          </Link>
        )}
        <button
          onClick={toggleCartPreview}
          className='p-2 cursor-pointer flex items-center justify-center relative'
        >
          <img
            src='/assets/shopping-bag.svg'
            alt='bag_icon'
            className='w-6 h-6'
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
