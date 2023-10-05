'use client';

import { useState } from 'react';
import { BsList } from 'react-icons/bs';

import Link from 'next/link';

import { Drawer } from '@/components/ui/generic/drawer/Drawer';

export const MobileMenu = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <div className='block md:hidden'>
      <BsList
        className='h-7 w-7'
        role='button'
        onClick={() => setOpenDrawer(true)}
      />
      <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className='flex flex-col gap-4'>
          <Link
            href='/shop/womens'
            className='cursor-pointer text-base font-bold'
            onClick={() => setOpenDrawer(false)}>
            WOMENS
          </Link>
          <Link
            href='/shop/mens'
            className='cursor-pointer text-base font-bold'
            onClick={() => setOpenDrawer(false)}>
            MENS
          </Link>
          <Link
            href='/shop/hats'
            className='cursor-pointer text-base'
            onClick={() => setOpenDrawer(false)}>
            HATS
          </Link>
          <Link
            href='/shop/jackets'
            className='cursor-pointer text-base'
            onClick={() => setOpenDrawer(false)}>
            JACKETS
          </Link>
          <Link
            href='/shop/sneakers'
            className='cursor-pointer text-base'
            onClick={() => setOpenDrawer(false)}>
            SNEAKERS
          </Link>
          <Link
            href='/shop'
            className='cursor-pointer text-base'
            onClick={() => setOpenDrawer(false)}>
            ALL
          </Link>
        </div>
      </Drawer>
    </div>
  );
};
