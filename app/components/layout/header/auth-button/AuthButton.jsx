'use client';

import Link from 'next/link';

import { logoutUser } from '@/actions/auth/auth';

export const AuthButton = ({ userSession }) => {
  return userSession.accessToken ? (
    <button
      onClick={() => logoutUser(userSession.accessToken)}
      className='cursor-pointer p-2 text-base'
    >
      SIGN OUT
    </button>
  ) : (
    <Link href='/auth' className='cursor-pointer p-2 text-base'>
      SIGN IN
    </Link>
  );
};
