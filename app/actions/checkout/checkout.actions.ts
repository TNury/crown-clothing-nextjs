'use server';

import callAPI from '@/services/api';

import { storeCookie } from '@/actions/cookies/cookies';

import {
  CheckoutDeliveryFormFieldProps,
  CheckoutSessionProps,
  CompleteCheckoutArgs,
  CompleteCheckoutResponse,
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
  deliveryFormProps: CheckoutDeliveryFormFieldProps
): Promise<
  | UpdateCheckoutShippingAddressResponse['checkoutShippingAddressUpdateV2']
  | UpdateCheckoutContactEmailResponse['checkoutEmailUpdateV2']
> {
  const { shipping_address, email } = deliveryFormProps;

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

  const updatedCheckoutSession: CheckoutSessionProps = {
    ...checkoutEmailUpdateResponse.checkout,
  };

  storeCookie('checkoutSession', updatedCheckoutSession);

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

export async function completeCheckout(
  checkoutId: string,
  payment: CompleteCheckoutArgs
): Promise<CompleteCheckoutResponse['checkoutCompleteWithTokenizedPaymentV3']> {
  try {
    const response: CompleteCheckoutResponse = await callAPI(
      'CompleteCheckout',
      {
        checkoutId,
        payment,
      },
      {
        cache: 'no-cache',
      }
    );

    if (response.checkoutCompleteWithTokenizedPaymentV3.checkoutUserErrors[0]) {
      return response.checkoutCompleteWithTokenizedPaymentV3;
    }

    if (response.checkoutCompleteWithTokenizedPaymentV3.payment) {
      storeCookie('checkoutSession', null);
      storeCookie('cartSession', null);

      return response.checkoutCompleteWithTokenizedPaymentV3;
    } else {
      throw new Error('Payment could not be processed');
    }
  } catch (error) {
    console.error(error);
  }
}
