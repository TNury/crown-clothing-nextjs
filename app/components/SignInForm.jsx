'use client';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Input } from '@/components/ui/generic/input/Input';
import { Button } from '@/components/ui/generic/button/Button';

import { loginUser } from '@/actions/auth/auth';

import { SignInFormValidationSchema } from '@/utils/auth/auth.utils';

const SignInForm = () => {
  const router = useRouter();

  const handleOnSubmit = async (formData) => {
    await loginUser(formData);

    setTimeout(() => {
      router.push('/');
    }, 1);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInFormValidationSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10'>
      <Input
        id='email'
        type='email'
        placeholder='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Input
        id='password'
        type='password'
        placeholder='Password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default SignInForm;
