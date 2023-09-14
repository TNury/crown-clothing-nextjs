'use server';

import callAPI from '@/services/api';

import { storeCookie } from '@/actions/cookies/cookies';

import {
  CheckoutDeliveryFormFieldProps,
  CreateCheckoutArgs,
  CreateCheckoutResponse,
  UpdateCheckoutContactEmailArgs,
  UpdateCheckoutContactEmailResponse,
  UpdateCheckoutShippingAddressArgs,
  UpdateCheckoutShippingAddressResponse,
} from '@/types/checkout/checkout.types';

export async function createCheckout(
  args: CreateCheckoutArgs['input']
): Promise<CreateCheckoutResponse['checkoutCreate']['checkout']> {
  const response: CreateCheckoutResponse = await callAPI(
    'CreateCheckout',
    {
      input: args,
    },
    {
      cache: 'no-cache',
    }
  );

  storeCookie('checkoutSession', response.checkoutCreate.checkout);

  return response.checkoutCreate.checkout;
}

export async function handleCheckoutDeliveryStep(
  checkoutId: string,
  args: CheckoutDeliveryFormFieldProps
): Promise<
  | UpdateCheckoutShippingAddressResponse['checkoutShippingAddressUpdateV2']
  | UpdateCheckoutContactEmailResponse['checkoutEmailUpdateV2']
> {
  const { shipping_address, email } = args;

  const shippingAddressUpdateResponse = await updateCheckoutShippingAddress(
    checkoutId,
    shipping_address
  );

  if (shippingAddressUpdateResponse.checkoutUserErrors[0]) {
    const error = shippingAddressUpdateResponse.checkoutUserErrors[0].code;

    console.error(error);

    return shippingAddressUpdateResponse;
  }

  const checkoutEmailUpdateResponse = await updateCheckoutContactEmail(
    checkoutId,
    email
  );

  if (checkoutEmailUpdateResponse.checkoutUserErrors[0]) {
    const error = checkoutEmailUpdateResponse.checkoutUserErrors[0].code;

    console.error(error);

    return checkoutEmailUpdateResponse;
  }

  storeCookie('checkoutSession', checkoutEmailUpdateResponse.checkout);

  return checkoutEmailUpdateResponse;
}

export async function updateCheckoutShippingAddress(
  checkoutId: UpdateCheckoutShippingAddressArgs['checkoutId'],
  args: UpdateCheckoutShippingAddressArgs['input']
): Promise<
  UpdateCheckoutShippingAddressResponse['checkoutShippingAddressUpdateV2']
> {
  const response: UpdateCheckoutShippingAddressResponse = await callAPI(
    'UpdateCheckoutShippingAddress',
    {
      checkoutId,
      input: args,
    },
    {
      cache: 'no-cache',
    }
  );

  return response.checkoutShippingAddressUpdateV2;
}

export async function updateCheckoutContactEmail(
  checkoutId: UpdateCheckoutContactEmailArgs['checkoutId'],
  args: UpdateCheckoutContactEmailArgs['input']
): Promise<UpdateCheckoutContactEmailResponse['checkoutEmailUpdateV2']> {
  const response: UpdateCheckoutContactEmailResponse = await callAPI(
    'UpdateCheckoutContactEmail',
    {
      checkoutId,
      input: args,
    },
    {
      cache: 'no-cache',
    }
  );

  return response.checkoutEmailUpdateV2;
}
