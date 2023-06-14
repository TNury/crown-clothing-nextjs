import Image from 'next/image';
import Link from 'next/link';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { AuthButton } from './auth-button/AuthButton';
import { CartButton } from './cart-button/CartButton';

export const Header = async () => {
  const userSession = (await retrieveCookie('userSession')) || {};
  const cartSession = (await retrieveCookie('cartSession')) || {};

  return (
    <header className='fixed top-0 z-20 flex h-20 w-full items-center justify-between bg-white pl-4 md:pl-16 md:pr-14'>
      <Link href='/'>
        <div className='relative h-14 w-14'>
          <Image src='/assets/logo.svg' alt='brand_logo' fill />
        </div>
      </Link>
      <div className='flex items-center gap-2'>
        <Link href='/shop' className='cursor-pointer p-2 text-base'>
          SHOP
        </Link>
        <AuthButton userSession={userSession} />
        <CartButton cartSession={cartSession} />
      </div>
    </header>
  );
};
