'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { Button } from '@/components/ui/generic/button/Button';

import { completeCheckout } from '@/actions/checkout/checkout.actions';

import {
  cardCvcElementOptions,
  cardExpiryElementOptions,
  cardNumberElementOptions,
} from './utils/paymentFormGroup.utils';

type PaymentFormGroupProps = {
  checkoutId: string;
};

export const PaymentFormGroup: React.FC<PaymentFormGroupProps> = ({
  checkoutId,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const triggerPayment = async () => {
    if (!stripe || !elements) {
      // In case Stripe.js has not yet loaded.
      return;
    }

    const cardNumberElement = elements.getElement('cardNumber');

    const result = await stripe.createToken(cardNumberElement, {
      currency: 'BRL',
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      await completeCheckout(checkoutId, result.token.id);
    }
  };

  return (
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
  );
};
