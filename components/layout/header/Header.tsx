import Image from 'next/image';
import Link from 'next/link';

import { AuthButton } from '@/components/layout/header/auth-button/AuthButton';
import { MobileMenu } from '@/components/layout/header/mobile-menu/MobileMenu';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { UserSessionProps } from '@/types/auth/auth.types';
import { CartFieldsFragment } from '@/types/queries/queries';

export const Header = async () => {
  const userSession: UserSessionProps =
    (await retrieveCookie('userSession')) || {};
  const cartSession: CartFieldsFragment =
    (await retrieveCookie('cartSession')) || {};

  return (
    <header className='fixed top-0 z-20 flex h-14 w-full items-center justify-center border border-b bg-white pl-4 pr-2 md:h-20 md:pl-8 md:pr-6'>
      <MobileMenu />
      <Link href='/' className='absolute h-7 w-7 md:relative md:h-14 md:w-14'>
        <Image src='/assets/logo.svg' alt='brand_logo' fill />
      </Link>
      <div className='absolute hidden gap-2 md:flex'>
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
      <div className='ml-auto flex items-center gap-2'>
        <AuthButton userSession={userSession} />
        <Link
          href='/bag'
          className='relative flex cursor-pointer items-center justify-center p-2'>
          <div className='relative h-6 w-6'>
            <Image src='/assets/shopping-bag.svg' alt='bag_icon' fill />
          </div>
          <span className='absolute top-4 text-[10px] font-bold'>
            {cartSession.totalQuantity ? cartSession.totalQuantity : 0}
          </span>
        </Link>
      </div>
    </header>
  );
};
