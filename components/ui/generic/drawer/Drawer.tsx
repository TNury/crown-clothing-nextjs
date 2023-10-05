'use client';

import { ReactNode } from 'react';

import { CloseButton } from '../close-button/CloseButton';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      data-open={isOpen}
      className='data-[open="true"]:pointer-events-all fixed inset-0 z-10 data-[open="false"]:pointer-events-none'>
      <div
        data-open={isOpen}
        className='absolute inset-0 -z-10 bg-opaque-black transition-all duration-200 data-[open="false"]:opacity-0'
        onClick={onClose}
      />
      <div
        data-open={isOpen}
        className='relative z-20 h-screen w-2/3 bg-white p-4 transition-all duration-200 data-[open="false"]:translate-x-[-100%]'>
        <CloseButton onClick={onClose} className='absolute right-1 top-1' />
        {children}
      </div>
    </div>
  );
};
