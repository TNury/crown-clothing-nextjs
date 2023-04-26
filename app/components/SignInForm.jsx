'use client';

import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';

import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';

import { SignInFormValidationSchema } from '@/utils/auth/auth.utils';

import { signInUser } from '@services/firebase';
import { setCurrentUser } from 'redux/user/user.reducer';

const SignInForm = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleOnSubmit = async (props) => {
    try {
      const response = await signInUser(props.email, props.password);

      dispatch(setCurrentUser(response.user));

      router.push('/');
    } catch (error) {
      console.log(error);
    }
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
        label='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Input
        id='password'
        type='password'
        label='Password'
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
