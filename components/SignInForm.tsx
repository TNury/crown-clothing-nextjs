'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';

import { loginUser } from '@/actions/auth/auth.actions';

import { SignInFormValidationSchema } from '@/lib/auth/auth';

import { LoginUserArgs } from '@/types/auth/auth.types';

const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const handleOnSubmit = async (formData: LoginUserArgs): Promise<void> => {
    setLoading(true);

    const response = await loginUser(formData);

    const userErrors = response.customerAccessTokenCreate.userErrors;

    if (userErrors.length > 0) {
      setErrorMessage(userErrors[0].message);
      setLoading(false);
    } else {
      router.refresh();
    }
  };

  const formik = useFormik<LoginUserArgs>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInFormValidationSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10'>
        <div className='flex flex-col gap-4'>
          <Input
            id='email'
            type='email'
            label='Email'
            placeholder='john_doe@gmail.com'
            disabled={loading}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            placeholder='******'
            disabled={loading}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button disabled={loading} type='submit'>
          Submit
        </Button>
      </form>
      <Alert
        open={Boolean(errorMessage)}
        message={errorMessage}
        variant='error'
        onClose={() => setErrorMessage('')}
      />
    </>
  );
};

export default SignInForm;
