import Link from 'next/link';

import SignInForm from '@/components/SignInForm';

const SignIn: React.FC = () => {
  return (
    <main className='flex min-h-[calc(100vh-5rem)] w-full flex-col items-center px-4 py-16'>
      <div className='flex w-full flex-col gap-16 md:w-[450px]'>
        <div className='flex flex-col gap-4 text-center'>
          <h1 className='text-4xl font-bold uppercase'>Sign In</h1>
          <span className='text-base'>
            Sign in with your email and password
          </span>
        </div>
        <div className='flex flex-col gap-4'>
          <SignInForm />
          <span className='text-base'>
            Don't have an account?{' '}
            <Link href='/sign-up' className='underline underline-offset-4'>
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
