'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/actions/auth/auth';

import type { UserSessionProps } from '@/types/auth/auth';

export const AuthButton = ({
  userSession,
}: {
  userSession: UserSessionProps;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(userSession.accessToken);

    router.refresh();
  };

  return userSession.accessToken ? (
    <button onClick={handleLogout} className='cursor-pointer p-2 text-base'>
      SIGN OUT
    </button>
  ) : (
    <Link href='/auth' className='cursor-pointer p-2 text-base'>
      SIGN IN
    </Link>
  );
};
