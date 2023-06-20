'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';

import { loginUser } from '@/actions/auth/auth';

import { SignInFormValidationSchema } from '@/lib/auth/auth';

import type { SignInFormProps } from '@/types/forms/forms';

const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const handleOnSubmit = async (formData: SignInFormProps): Promise<void> => {
    setLoading(true);

    const response = await loginUser(formData);

    const userErrors = response.customerAccessTokenCreate.userErrors;

    if (userErrors.length > 0) {
      setErrorMessage(userErrors[0].message);
      setLoading(false);
    } else {
      setTimeout(() => {
        router.refresh();
        router.push('/');
      }, 0);
    }
  };

  const formik = useFormik<SignInFormProps>({
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
        <Input
          id='email'
          type='email'
          placeholder='Email'
          disabled={loading}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Input
          id='password'
          type='password'
          placeholder='Password'
          disabled={loading}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
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
