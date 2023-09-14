'use client';

import { useFormik } from 'formik';

import { Button } from '@/components/ui/generic/button/Button';
import { Input } from '@/components/ui/generic/input/Input';
import { ShippingFormGroup } from '@/components/ui/specialized/shipping-form-group/ShippingFormGroup';

import {
  handleCheckoutDeliveryStep,
  updateCheckoutShippingAddress,
} from '@/actions/checkout/checkout.actions';

import { checkoutDeliveryFormSchema } from '@/lib/validation/validation';

import { CheckoutDeliveryFormFieldProps } from '@/types/checkout/checkout.types';

type CheckoutDeliveryFormProps = {
  checkoutId: string;
};

export const CheckoutDeliveryForm: React.FC<CheckoutDeliveryFormProps> = ({
  checkoutId,
}) => {
  const formik = useFormik<CheckoutDeliveryFormFieldProps>({
    initialValues: {
      shipping_address: {
        firstName: 'Yuri',
        lastName: 'Pereira',
        address1: '67 ChristChurch Ave',
        address2: '',
        zip: 'NW67PB',
        city: 'London',
        province: 'London',
        country: 'GB',
        phone: '+44 1234 567890',
      },
      email: 'yurdesou@gmail.com',
    },
    onSubmit: handleSubmit,
    validationSchema: checkoutDeliveryFormSchema,
  });

  async function handleSubmit(formData: CheckoutDeliveryFormFieldProps) {
    const checkoutShippingAddressResponse = await handleCheckoutDeliveryStep(
      checkoutId,
      formData
    );

    console.log(checkoutShippingAddressResponse);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex w-full flex-col gap-16'>
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
  );
};
