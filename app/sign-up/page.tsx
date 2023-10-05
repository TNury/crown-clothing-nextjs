import Link from 'next/link';

import SignUpForm from '@/components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <main className='flex min-h-[calc(100vh-5rem)] w-full flex-col items-center px-4 py-16'>
      <div className='flex flex-col gap-16 w-full md:w-[450px]'>
        <div className='flex flex-col gap-4 text-center'>
          <h1 className='text-4xl font-bold uppercase'>Sign Up</h1>
          <span className='text-base'>
            Sign up with your email and password
          </span>
        </div>
        <div className='flex flex-col gap-4'>
          <SignUpForm />
          <span className='text-base'>
            Already have an account?{' '}
            <Link href='/sign-in' className='underline underline-offset-4'>
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
