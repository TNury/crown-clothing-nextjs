'use client';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Input } from '@/components/ui/generic/input/Input';
import { Button } from '@/components/ui/generic/button/Button';

import { registerUser } from '@/actions/auth/auth';

import { SignUpFormValidationSchema } from '@/utils/auth/auth.utils';

const SignUpForm = () => {
  const router = useRouter();

  const handleOnSubmit = async (formData) => {
    await registerUser(formData);

    /*
      registerUser stores a cookie after it successfully logs a user in.
      For some reason if we don't set a timeout before redirecting the user,
      it generates a TREE MISMATCH error.
    */
    setTimeout(() => {
      router.push('/');
    }, 1);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignUpFormValidationSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10'>
      <Input
        id='firstName'
        type='text'
        placeholder='First Name'
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <Input
        id='lastName'
        type='text'
        placeholder='Last Name'
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
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
      <Input
        id='confirm_password'
        type='password'
        placeholder='Confirm Password'
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={
          formik.touched.confirm_password &&
          Boolean(formik.errors.confirm_password)
        }
        helperText={
          formik.touched.confirm_password && formik.errors.confirm_password
        }
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default SignUpForm;
