'use client';

import Link from 'next/link';

import { logoutUser } from '@/actions/auth/auth.actions';

import type { UserSessionProps } from '@/types/auth/auth.types';

type AuthButtonProps = {
  userSession: UserSessionProps;
};

export const AuthButton: React.FC<AuthButtonProps> = ({ userSession }) => {
  const handleLogout = async (): Promise<void> => {
    await logoutUser(userSession.accessToken);
  };

  return userSession.accessToken ? (
    <button onClick={handleLogout} className='cursor-pointer p-2 text-base'>
      SIGN OUT
    </button>
  ) : (
    <Link href='/sign-in' className='cursor-pointer p-2 text-base'>
      SIGN IN
    </Link>
  );
};
