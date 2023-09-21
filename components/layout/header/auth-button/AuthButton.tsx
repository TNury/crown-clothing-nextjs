'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/actions/auth/auth.actions';

import type { UserSessionProps } from '@/types/auth/auth.types';

type AuthButtonProps = {
  userSession: UserSessionProps;
};

export const AuthButton: React.FC<AuthButtonProps> = ({ userSession }) => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
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
