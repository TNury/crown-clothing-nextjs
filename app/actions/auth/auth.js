'use server';

import { redirect } from 'next/navigation';

import { storeCookie } from '../cookies/cookies';

import callAPI from '@services/api';

export async function registerUser(formData) {
  const payload = Object.fromEntries(formData.entries());

  const registrationResponse = await callAPI(
    'services/queries/auth.graphql',
    'createCustomer',
    { ...payload }
  );

  const accessTokenResponse = await callAPI(
    'services/queries/auth.graphql',
    'createAccessToken',
    {
      email: payload.email,
      password: payload.password,
    }
  );

  const accessToken =
    accessTokenResponse.customerAccessTokenCreate.customerAccessToken
      .accessToken;

  storeCookie('userSession', {
    ...registrationResponse.customerCreate.customer,
    accessToken,
  });

  redirect('/');
}
