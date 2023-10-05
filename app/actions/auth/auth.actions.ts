'use server';

import callAPI from '@/services/api';

import { LoginUserArgs, RegisterUserArgs } from '@/types/auth/auth.types';
import {
  CreateAccessTokenMutation,
  CreateCustomerMutation,
  RetrieveCustomerQuery,
} from '@/types/queries/queries';

import { deleteCookie, storeCookie } from '../cookies/cookies';

export async function registerUser(
  formData: RegisterUserArgs
): Promise<CreateCustomerMutation> {
  const registrationResponse: CreateCustomerMutation = await callAPI(
    'CreateCustomer',
    { ...formData },
    {
      cache: 'no-cache',
    }
  );

  const accessTokenResponse: CreateAccessTokenMutation = await callAPI(
    'CreateAccessToken',
    {
      email: formData.email,
      password: formData.password,
    },
    {
      cache: 'no-cache',
    }
  );

  if (!Boolean(registrationResponse.customerCreate.userErrors.length > 0)) {
    const accessToken =
      accessTokenResponse.customerAccessTokenCreate.customerAccessToken
        .accessToken;

    storeCookie('userSession', {
      user: registrationResponse.customerCreate.customer,
      accessToken,
    });
  }

  return registrationResponse;
}

export async function loginUser(
  formData: LoginUserArgs
): Promise<CreateAccessTokenMutation> {
  const accessTokenResponse: CreateAccessTokenMutation = await callAPI(
    'CreateAccessToken',
    {
      ...formData,
    },
    {
      cache: 'no-cache',
    }
  );

  if (
    !Boolean(
      accessTokenResponse.customerAccessTokenCreate.userErrors.length > 0
    )
  ) {
    const accessToken =
      accessTokenResponse.customerAccessTokenCreate.customerAccessToken
        .accessToken;

    const loginResponse: RetrieveCustomerQuery = await callAPI(
      'RetrieveCustomer',
      {
        accessToken,
      },
      {
        cache: 'no-cache',
      }
    );

    storeCookie('userSession', {
      user: loginResponse.customer,
      accessToken,
    });
  }

  return accessTokenResponse;
}

export async function logoutUser(accessToken: string): Promise<void> {
  await callAPI(
    'DeleteCustomerAccessToken',
    {
      accessToken,
    },
    {
      cache: 'no-cache',
    }
  );

  deleteCookie('userSession');
}
