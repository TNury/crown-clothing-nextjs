'use client';

import { useState } from 'react';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { Button } from '@/components/ui/generic/button/Button';

import { completeCheckout } from '@/actions/checkout/checkout.actions';

import { CheckoutSessionProps } from '@/types/checkout/checkout.types';
import { CurrencyCode, PaymentTokenType } from '@/types/queries/queries';

import {
  cardCvcElementOptions,
  cardExpiryElementOptions,
  cardNumberElementOptions,
} from './utils/paymentFormGroup.utils';

type PaymentFormGroupProps = {
  checkoutSession: CheckoutSessionProps;
};

export const PaymentFormGroup: React.FC<PaymentFormGroupProps> = ({
  checkoutSession,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const stripe = useStripe();
  const elements = useElements();

  const triggerPayment = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      // In case Stripe.js has not yet loaded.
      return;
    }

    const cardNumberElement = elements.getElement('cardNumber');

    const tokenResult = await stripe.createToken(cardNumberElement, {
      currency: 'BRL',
    });

    if (tokenResult.error) {
      console.log(tokenResult.error.message);
      setErrorMessage(tokenResult.error.message);
    } else {
      await completeCheckout(checkoutSession.id, {
        type: PaymentTokenType.StripeVaultToken,
        paymentAmount: {
          amount: checkoutSession.totalPrice.amount,
          currencyCode: CurrencyCode.Brl,
        },
        idempotencyKey: uuidv4(),
        billingAddress: {
          ...checkoutSession.shippingAddress,
        },
        test: true,
        paymentData: tokenResult.token.id,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <div
        aria-disabled={loading}
        className='flex w-1/2 flex-col gap-10 transition-all duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-50'>
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
      <Alert
        open={Boolean(errorMessage)}
        message={errorMessage}
        variant='error'
        onClose={() => setErrorMessage('')}
      />
    </>
  );
};
