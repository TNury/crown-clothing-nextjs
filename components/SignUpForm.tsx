'use client';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';

import { registerUser } from '@/actions/auth/auth';

import { SignUpFormValidationSchema } from '@/lib/auth/auth';

import { SignUpFormProps } from '@/types/forms/forms';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const handleOnSubmit = async (formData: SignUpFormProps): Promise<void> => {
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
        id='confirmPassword'
        type='password'
        placeholder='Confirm Password'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default SignUpForm;
