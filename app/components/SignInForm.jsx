import { redirect } from 'next/navigation';

import { Input } from '@/components/ui/generic/input/Input';
import { Button } from '@/components/ui/generic/button/Button';

import { storeCookie } from '@/actions/cookies/cookies';

import callAPI from '@services/api';

const SignInForm = () => {
  const handleOnSubmit = async (formData) => {
    'use server';

    const email = formData.get('email');
    const password = formData.get('password');
    const accessTokenResponse = await callAPI(
      'services/queries/auth.graphql',
      'createAccessToken',
      {
        email,
        password,
      }
    );
    const accessToken =
      accessTokenResponse.customerAccessTokenCreate.customerAccessToken
        .accessToken;
    const loginResponse = await callAPI(
      'services/queries/auth.graphql',
      'retrieveCustomer',
      {
        accessToken,
      }
    );

    storeCookie('userSession', {
      ...loginResponse.customer,
      accessToken,
    });

    redirect('/');
  };

  return (
    <form action={handleOnSubmit} className='flex flex-col gap-10'>
      <Input
        name='email'
        type='email'
        placeholder='Email'
        required
        pattern='^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$'
      />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        minLength={6}
        required
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default SignInForm;
