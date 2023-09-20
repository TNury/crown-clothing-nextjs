import {
  StripeCardCvcElementOptions,
  StripeCardElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from '@stripe/stripe-js';

const baseOptions = {
  classes: {
    base: 'w-full p-4 border border-black h-[58px] flex justify-center flex-col',
    invalid: 'text-red-500',
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

export const cardElementOptions: StripeCardElementOptions = {
  ...baseOptions,
  hidePostalCode: true,
};

export const cardNumberElementOptions: StripeCardNumberElementOptions = {
  ...baseOptions,
  showIcon: true,
};

export const cardExpiryElementOptions: StripeCardExpiryElementOptions = {
  ...baseOptions,
};

export const cardCvcElementOptions: StripeCardCvcElementOptions = {
  ...baseOptions,
};
