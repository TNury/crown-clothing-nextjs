'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';
import { ShippingFormGroup } from '@/components/ui/specialized/shipping-form-group/ShippingFormGroup';

import { handleCheckoutDeliveryStep } from '@/actions/checkout/checkout.actions';

import { checkoutDeliveryFormSchema } from '@/lib/validation/validation';

import {
  CheckoutDeliveryFormFieldProps,
  CheckoutSessionProps,
} from '@/types/checkout/checkout.types';

import { Alert } from '../../generic/alert/Alert';

type CheckoutDeliveryFormProps = {
  checkoutSession: CheckoutSessionProps;
};

export const CheckoutDeliveryForm: React.FC<CheckoutDeliveryFormProps> = ({
  checkoutSession,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const formik = useFormik<CheckoutDeliveryFormFieldProps>({
    initialValues: {
      shipping_address: {
        firstName: 'Yuri',
        lastName: 'Pereira',
        address1: 'Estudante Idalvo 67',
        address2: '',
        zip: '58057450',
        city: 'João Pessoa',
        province: 'Paraíba',
        country: 'BR',
        phone: '+55 83 981264559',
      },
      email: 'yurdesou@gmail.com',
    },
    onSubmit: handleSubmit,
    validationSchema: checkoutDeliveryFormSchema,
  });

  async function handleSubmit(formData: CheckoutDeliveryFormFieldProps) {
    setLoading(true);

    const checkoutResponse = await handleCheckoutDeliveryStep(
      checkoutSession.id,
      formData,
      Number(checkoutSession.totalPrice.amount)
    );

    if (checkoutResponse.checkoutUserErrors[0]) {
      setErrorMessage(checkoutResponse.checkoutUserErrors[0].code);
    } else {
      setTimeout(() => {
        router.push('/payment');
      }, 1);
    }

    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        aria-disabled={loading}
        className='flex w-full flex-col gap-16 aria-disabled:pointer-events-none aria-disabled:opacity-50'>
        <ShippingFormGroup formik={formik} />
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold uppercase'>Contact Details</h1>
          <p className='text-base'>
            We'll use these details to keep you informed on your delivery.
          </p>
          <div className='flex gap-4'>
            <Input
              id='email'
              label='Email'
              variant='secondary'
              placeholder='John_doe@gmail.com'
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Input
              id='shipping_address.phone'
              label='Phone number'
              variant='secondary'
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
          className='flex w-fit items-center justify-between gap-4'>
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
