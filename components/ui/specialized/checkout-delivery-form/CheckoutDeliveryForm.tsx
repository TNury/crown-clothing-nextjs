'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Alert } from '@/components/ui/generic/alert/Alert';
import { Button } from '@/components/ui/generic/button/Button';
import { CheckBox } from '@/components/ui/generic/check-box/CheckBox';
import { Input } from '@/components/ui/generic/input/Input';
import { AddressFormGroup } from '@/components/ui/specialized/address-form-group/AddressFormGroup';

import { handleCheckoutDeliveryStep } from '@/actions/checkout/checkout.actions';

import { checkoutDeliveryFormSchema } from '@/lib/validation/validation';

import { UserSessionProps } from '@/types/auth/auth.types';
import {
  CheckoutDeliveryFormFieldProps,
  CheckoutSessionProps,
} from '@/types/checkout/checkout.types';

import { getCheckoutDeliveryFormInitialValue } from './utils/getCheckoutDeliveryFormInitialValues';

type CheckoutDeliveryFormProps = {
  checkoutSession: CheckoutSessionProps;
  userSession: UserSessionProps;
};

export const CheckoutDeliveryForm: React.FC<CheckoutDeliveryFormProps> = ({
  checkoutSession,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const formik = useFormik<CheckoutDeliveryFormFieldProps>({
    initialValues: getCheckoutDeliveryFormInitialValue(checkoutSession),
    onSubmit: handleSubmit,
    validationSchema: checkoutDeliveryFormSchema,
  });

  async function handleSubmit(formData: CheckoutDeliveryFormFieldProps) {
    setLoading(true);

    const checkoutResponse = await handleCheckoutDeliveryStep(
      checkoutSession.id,
      formData
    );

    if (checkoutResponse.checkoutUserErrors[0]) {
      setErrorMessage(checkoutResponse.checkoutUserErrors[0].code);
    } else {
      router.push('/payment');
    }

    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        aria-disabled={loading}
        className='flex w-full flex-col gap-16 aria-disabled:pointer-events-none aria-disabled:opacity-50'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold uppercase'>Shipping Address</h1>
          <AddressFormGroup path='shipping_address' formik={formik} />
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold uppercase'>Contact Details</h1>
          <p className='text-base'>
            We'll use these details to keep you informed on your delivery.
          </p>
          <div className='flex flex-col gap-4 md:flex-row'>
            <Input
              id='email'
              label='Email'
              placeholder='John_doe@gmail.com'
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Input
              id='shipping_address.phone'
              label='Phone number'
              placeholder='+44 1234 567890'
              onChange={formik.handleChange}
              value={formik.values.shipping_address.phone}
              error={
                formik.touched.shipping_address?.phone &&
                Boolean(formik.errors.shipping_address?.phone)
              }
              helperText={
                formik.touched.shipping_address?.phone &&
                formik.errors.shipping_address?.phone
              }
            />
          </div>
        </div>

        <Button
          type='submit'
          className='flex w-full items-center justify-between gap-4 md:w-fit'>
          <p className='text-base'>Continue with payment</p>
          <span className='h-8 text-lg'>&#8594;</span>
        </Button>
      </form>
      <Alert
        open={Boolean(errorMessage)}
        message={errorMessage}
        variant='error'
        onClose={() => setErrorMessage('')}
      />
    </>
  );
};
