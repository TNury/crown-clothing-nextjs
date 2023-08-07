'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';

import { registerUser } from '@/actions/auth/auth';

import { SignUpFormValidationSchema } from '@/lib/auth/auth';

import { SignUpFormProps } from '@/types/forms/forms';

const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const handleOnSubmit = async (formData: SignUpFormProps): Promise<void> => {
    setLoading(true);

    const response = await registerUser(formData);

    const userErrors = response.customerCreate.userErrors;

    if (userErrors.length > 0) {
      setErrorMessage(userErrors[0].message);
    } else {
      setTimeout(() => {
        router.refresh();
      }, 0);
    }

    setLoading(false);
  };

  const formik = useFormik<SignUpFormProps>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpFormValidationSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10'>
        <Input
          id='firstName'
          type='text'
          placeholder='First Name'
          disabled={loading}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <Input
          id='lastName'
          type='text'
          placeholder='Last Name'
          disabled={loading}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
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
        <Input
          id='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          value={formik.values.confirmPassword}
          disabled={loading}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
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

export default SignUpForm;
