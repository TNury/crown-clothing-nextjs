'use client';

import { useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useFormik } from 'formik';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { CheckBox } from '@/components/ui/generic/check-box/CheckBox';
import { AddressFormGroup } from '@/components/ui/specialized/address-form-group/AddressFormGroup';
import { PaymentFormGroup } from '@/components/ui/specialized/payment-form-group/PaymentFormGroup';

import { billingAddressFormSchema } from '@/lib/validation/validation';

import {
  CheckoutBillingFormFieldProps,
  CheckoutSessionProps,
} from '@/types/checkout/checkout.types';

const stripePromise = loadStripe(
  'pk_test_51JDDw8FcRQWdCUNX8vvnirOihRxh6yftU5OYL6ZAM4gR6BijUFs8uxXlZKqxw7aYqXMoJwAWIYaifWtylafwFb3Q00pZS0KQny'
);

type CheckoutPaymentFormProps = {
  checkoutSession: CheckoutSessionProps;
};

export const CheckoutPaymentForm: React.FC<CheckoutPaymentFormProps> = ({
  checkoutSession,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const formik = useFormik<CheckoutBillingFormFieldProps>({
    initialValues: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      province: '',
      zip: '',
    },
    onSubmit: () => {},
    validationSchema: billingAddressFormSchema,
  });

  const handleOnCheckedChange = (checkedState: boolean) => {
    if (checkedState) {
      formik.setFormikState((prevState) => ({
        ...prevState,
        values: {
          address1: checkoutSession.shippingAddress.address1,
          address2: checkoutSession.shippingAddress.address2,
          city: checkoutSession.shippingAddress.city,
          country: checkoutSession.shippingAddress.countryCodeV2,
          firstName: checkoutSession.shippingAddress.firstName,
          lastName: checkoutSession.shippingAddress.lastName,
          province: checkoutSession.shippingAddress.province,
          zip: checkoutSession.shippingAddress.zip,
        },
      }));
    } else {
      formik.setFormikState((prevState) => ({
        ...prevState,
        values: {
          ...formik.initialValues,
        },
      }));
    }
  };

  return (
    <>
      <div
        aria-disabled={loading}
        className='flex w-full flex-col gap-16 transition-all duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-50'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-4xl font-bold uppercase'>Billing Address</h1>
            <AddressFormGroup formik={formik} />
            <CheckBox
              label='Same as shipping address'
              onCheckedChange={handleOnCheckedChange}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold uppercase'>Payment Details</h1>
          <div className='flex flex-col'>
            <p className='text-base text-red-500'>
              This website is just a demo, please do <strong>NOT</strong> insert
              any real credit card numbers.
            </p>
            <p className='text-base text-red-500'>
              In order to test a successful purchase, please use the following
              credit card details:
            </p>
            <p className='text-base text-red-500'>
              <strong>Card Number:</strong> 4242 4242 4242 4242 <br />
              <strong>Expiration Date:</strong> 08/29 <br />
              <strong>CVV:</strong> 242 <br />
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentFormGroup
              loading={loading}
              setLoading={setLoading}
              setErrorMessage={setErrorMessage}
              formik={formik}
              checkoutSession={checkoutSession}
            />
          </Elements>
        </div>
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
