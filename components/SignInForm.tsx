'use client';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';

import { loginUser } from '@/actions/auth/auth';

import { SignInFormValidationSchema } from '@/utils/auth/auth.utils';

import type { SignInFormProps } from '@/types/forms/forms';

const SignInForm: React.FC = () => {
  const router = useRouter();

  const handleOnSubmit = async (formData: SignInFormProps): Promise<void> => {
    await loginUser(formData);

    setTimeout(() => {
      router.push('/');
    }, 1);
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
