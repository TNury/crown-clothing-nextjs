import SignInForm from 'components/SignInForm';
import SignUpForm from 'components/SignUpForm';

const AuthPage: React.FC = () => {
  return (
    <main className='w-full min-h-[calc(100vh-5rem)] px-4 py-16 flex justify-center gap-28'>
      <div className='w-96 flex flex-col gap-16'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Already have an account?</h2>
          <span className='text-base'>
            Sign in with your email and password
          </span>
        </div>
        <SignInForm />
      </div>
      <div className='w-96 flex flex-col gap-16'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Don't have an account?</h2>
          <span className='text-base'>
            Sign up with your email and password
          </span>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
};

export default AuthPage;
