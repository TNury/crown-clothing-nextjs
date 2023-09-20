'use client';

import { useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { PaymentFormGroup } from '@/components/ui/specialized/payment-form-group/PaymentFormGroup';

import { CheckoutSessionProps } from '@/types/checkout/checkout.types';

const stripePromise = loadStripe(
  'pk_test_51JDDw8FcRQWdCUNX8vvnirOihRxh6yftU5OYL6ZAM4gR6BijUFs8uxXlZKqxw7aYqXMoJwAWIYaifWtylafwFb3Q00pZS0KQny'
);

type CheckoutPaymentFormProps = {
  checkoutSession: CheckoutSessionProps;
};

export const CheckoutPaymentForm: React.FC<CheckoutPaymentFormProps> = ({
  checkoutSession,
}) => {
  return (
    <div className='flex flex-col gap-16'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl font-bold uppercase'>Payment Details</h1>
        <p className='text-base'>
          Please enter your payment details below. We accept all major credit
          cards.
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentFormGroup checkoutId={checkoutSession.id} />
      </Elements>
    </div>
  );
};
