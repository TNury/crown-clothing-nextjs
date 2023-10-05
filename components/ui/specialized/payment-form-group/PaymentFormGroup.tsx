'use client';

import { useState } from 'react';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
// import {
//   cardCvcElementOptions,
//   cardExpiryElementOptions,
//   cardNumberElementOptions,
// } from './utils/paymentFormGroup.utils';
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from '@stripe/stripe-js';
import { FormikProps } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { Button } from '@/components/ui/generic/button/Button';

import { completeCheckout } from '@/actions/checkout/checkout.actions';

import {
  CheckoutBillingFormFieldProps,
  CheckoutSessionProps,
} from '@/types/checkout/checkout.types';
import { CurrencyCode, PaymentTokenType } from '@/types/queries/queries';

type PaymentFormGroupProps = {
  checkoutSession: CheckoutSessionProps;
  formik: FormikProps<CheckoutBillingFormFieldProps>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const baseOptions = {
  classes: {
    base: 'w-full p-4 border-b bg-gray-1 border-black h-[58px] flex justify-center flex-col transition-all duration-200 ease-in-out',
    invalid: 'border-red-500 bg-red-100',
  },
  style: {
    base: {
      padding: '2px',
      color: 'black',
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 400,
      '::placeholder': {
        color: '#ACACAC',
      },
    },
  },
};

const cardNumberElementOptions: StripeCardNumberElementOptions = {
  ...baseOptions,
  showIcon: true,
};

const cardExpiryElementOptions: StripeCardExpiryElementOptions = {
  ...baseOptions,
};

const cardCvcElementOptions: StripeCardCvcElementOptions = {
  ...baseOptions,
};

export const PaymentFormGroup: React.FC<PaymentFormGroupProps> = ({
  formik,
  checkoutSession,
  setLoading,
  setErrorMessage,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const isReadyForSubmition = formik.isValid && formik.dirty;

  const triggerPayment = async () => {
    if (!stripe || !elements) {
      // In case Stripe.js has not yet loaded.
      return;
    }

    formik.submitForm();

    if (!isReadyForSubmition) {
      return;
    }

    setLoading(true);

    const cardNumberElement = elements.getElement('cardNumber');

    const tokenResult = await stripe.createToken(cardNumberElement, {
      currency: 'EUR',
    });

    if (tokenResult.error) {
      setErrorMessage(tokenResult.error.message);
    } else {
      const response = await completeCheckout(checkoutSession.id, {
        type: PaymentTokenType.StripeVaultToken,
        paymentAmount: {
          amount: checkoutSession.totalPrice.amount,
          currencyCode: CurrencyCode.Eur,
        },
        idempotencyKey: uuidv4(),
        billingAddress: {
          ...formik.values,
        },
        test: true,
        paymentData: tokenResult.token.id,
      });

      if (response.checkoutUserErrors[0]) {
        setErrorMessage(response.checkoutUserErrors[0].message);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className='flex w-1/2 flex-col gap-10'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-base'>Card number</p>
            <CardNumberElement options={cardNumberElementOptions} />
          </div>
          <div className='flex gap-4'>
            <div className='flex w-full flex-col gap-2'>
              <p className='text-base'>Expiration</p>
              <CardExpiryElement options={cardExpiryElementOptions} />
            </div>
            <div className='flex w-full flex-col gap-2'>
              <p className='text-base'>CVC</p>
              <CardCvcElement options={cardCvcElementOptions} />
            </div>
          </div>
        </div>
        <Button onClick={triggerPayment}>Pay</Button>
      </div>
    </>
  );
};
