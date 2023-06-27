import Image from 'next/image';
import Link from 'next/link';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { UserSessionProps } from '@/types/auth/auth';
import { CartFieldsFragment } from '@/types/queries/queries';

import { AuthButton } from './auth-button/AuthButton';
import { CartButton } from './cart-button/CartButton';

export const Header = async () => {
  const userSession: UserSessionProps =
    (await retrieveCookie('userSession')) || {};
  const cartSession: CartFieldsFragment =
    (await retrieveCookie('cartSession')) || {};

  return (
    <header className='fixed top-0 z-20 flex h-20 w-full items-center justify-center bg-white pl-4'>
      <Link href='/' className='absolute left-8 h-14 w-14'>
        <Image src='/assets/logo.svg' alt='brand_logo' fill />
      </Link>
      <div className='flex gap-2'>
        <Link
          href='/shop/womens'
          className='cursor-pointer p-2 text-base font-bold'>
          WOMENS
        </Link>
        <Link
          href='/shop/mens'
          className='cursor-pointer p-2 text-base font-bold'>
          MENS
        </Link>
        <Link href='/shop/hats' className='cursor-pointer p-2 text-base'>
          HATS
        </Link>
        <Link href='/shop/jackets' className='cursor-pointer p-2 text-base'>
          JACKETS
        </Link>
        <Link href='/shop/sneakers' className='cursor-pointer p-2 text-base'>
          SNEAKERS
        </Link>
        <Link href='/shop' className='cursor-pointer p-2 text-base'>
          ALL
        </Link>
      </div>
      <div className='absolute right-8 flex items-center gap-2'>
        <AuthButton userSession={userSession} />
        <CartButton cartSession={cartSession} />
      </div>
    </header>
  );
};
