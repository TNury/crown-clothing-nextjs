'use server';

import { storeCookie } from '../cookies/cookies';

import callAPI from '@services/api';

export async function registerUser(formData) {
  const registrationResponse = await callAPI(
    'services/queries/auth.graphql',
    'createCustomer',
    { ...formData }
  );
  const accessTokenResponse = await callAPI(
    'services/queries/auth.graphql',
    'createAccessToken',
    {
      email: formData.email,
      password: formData.password,
    }
  );
  const accessToken =
    accessTokenResponse.customerAccessTokenCreate.customerAccessToken
      .accessToken;

  storeCookie('userSession', {
    ...registrationResponse.customerCreate.customer,
    accessToken,
  });
}

export async function loginUser(formData) {
  const accessTokenResponse = await callAPI(
    'services/queries/auth.graphql',
    'createAccessToken',
    {
      ...formData,
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
}
