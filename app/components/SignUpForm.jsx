'use client';

import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/redux/user/user.reducer';

import { useFormik } from 'formik';

import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';

import { SignUpFormValidationSchema } from '@/utils/auth/auth.utils';

import fetchFromAPI from '@services/api';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  // Idea: If user already exists,
  // show a popup saying just that. But maybe dont clear the form data.
  const handleOnSubmit = async (props) => {
    try {
      const payload = { ...props };

      delete payload.confirm_password;

      const registrationResponse = await fetchFromAPI(
        'services/queries/auth.graphql',
        'createCustomer',
        { ...payload }
      );

      const accessTokenResponse = await fetchFromAPI(
        'services/queries/auth.graphql',
        'createAccessToken',
        {
          email: payload.email,
          password: payload.password,
        }
      );

      dispatch(
        setCurrentUser({
          ...registrationResponse.customerCreate.customer,
          accessToken:
            accessTokenResponse.customerAccessTokenCreate.customerAccessToken
              .accessToken,
        })
      );

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: 'yuri',
      lastName: 'souza',
      email: 'yurdesou@gmail.com',
      password: 'wordpass234',
      confirm_password: 'wordpass234',
    },
    validationSchema: SignUpFormValidationSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10'>
      <Input
        id='firstName'
        type='text'
        label='First Name'
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <Input
        id='lastName'
        type='text'
        label='Last Name'
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
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
