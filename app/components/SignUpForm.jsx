'use client';

import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { setCurrentUser } from 'redux/user/user.reducer';

import { useFormik } from 'formik';

import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';

import { SignUpFormValidationSchema } from '@/utils/auth/auth.utils';

import { createUser, signInUser, updateUser } from '@services/firebase';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  // Idea: If user already exists,
  // show a popup saying just that. But maybe dont clear the form data.
  const handleOnSubmit = async (props) => {
    try {
      const registrationResponse = await createUser(
        props.email,
        props.password
      );

      await updateUser(registrationResponse.user, {
        displayName: `${props.first_name} ${props.last_name}`,
      });

      const loginResponse = await signInUser(props.email, props.password);

      dispatch(setCurrentUser(loginResponse.user));

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
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
        id='first_name'
        type='text'
        label='First Name'
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
      />
      <Input
        id='last_name'
        type='text'
        label='Last Name'
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
      />
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
      <Input
        id='confirm_password'
        type='password'
        label='Confirm Password'
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
