'use server';

import callAPI from '@/services/api';

import { SignInFormProps, SignUpFormProps } from '@/types/forms/forms';
import {
  CreateAccessTokenMutation,
  CreateCustomerMutation,
  RetrieveCustomerQuery,
} from '@/types/queries/queries';

import { deleteCookie, storeCookie } from '../cookies/cookies';

export async function registerUser(formData: SignUpFormProps): Promise<void> {
  const registrationResponse: CreateCustomerMutation = await callAPI(
    'CreateCustomer',
    { ...formData }
  );

  const accessTokenResponse: CreateAccessTokenMutation = await callAPI(
    'CreateAccessToken',
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

export async function loginUser(formData: SignInFormProps): Promise<void> {
  const accessTokenResponse: CreateAccessTokenMutation = await callAPI(
    'CreateAccessToken',
    {
      ...formData,
    }
  );
  const accessToken =
    accessTokenResponse.customerAccessTokenCreate.customerAccessToken
      .accessToken;

  const loginResponse: RetrieveCustomerQuery = await callAPI(
    'RetrieveCustomer',
    {
      accessToken,
    }
  );

  storeCookie('userSession', {
    ...loginResponse.customer,
    accessToken,
  });
}

export async function logoutUser(accessToken: string): Promise<void> {
  await callAPI('DeleteCustomerAccessToken', {
    accessToken,
  });

  deleteCookie('userSession');
}