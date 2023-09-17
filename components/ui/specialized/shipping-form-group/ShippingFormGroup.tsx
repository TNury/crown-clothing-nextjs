'use client';

import { FormikProps } from 'formik';

import { Input } from '@/components/ui/generic/input/Input';
import { OptionsSelector } from '@/components/ui/generic/options-selector/OptionsSelector';

import { CheckoutDeliveryFormFieldProps } from '@/types/checkout/checkout.types';

type ShippingFormGroupProps = {
  formik: FormikProps<CheckoutDeliveryFormFieldProps>;
};

export const ShippingFormGroup: React.FC<ShippingFormGroupProps> = ({
  formik,
}) => {
  const handleCountryField = (value: string) => {
    formik.setFieldValue('shipping_address.country', value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl font-bold uppercase'>Shipping Address</h1>
      <div className='flex gap-4'>
        <Input
          id='shipping_address.firstName'
          label='First name'
          variant='secondary'
          placeholder='John'
          onChange={formik.handleChange}
          value={formik.values.shipping_address.firstName}
          error={
            formik.touched.shipping_address?.firstName &&
            Boolean(formik.errors.shipping_address?.firstName)
          }
          helperText={
            formik.touched.shipping_address?.firstName &&
            formik.errors.shipping_address?.firstName
          }
        />
        <Input
          id='shipping_address.lastName'
          label='Last name'
          variant='secondary'
          placeholder='Doe'
          onChange={formik.handleChange}
          error={
            formik.touched.shipping_address?.lastName &&
            Boolean(formik.errors.shipping_address?.lastName)
          }
          helperText={
            formik.touched.shipping_address?.lastName &&
            formik.errors.shipping_address?.lastName
          }
        />
      </div>
      <div className='flex gap-4'>
        <Input
          id='shipping_address.address1'
          label='Street and number'
          variant='secondary'
          placeholder='67 Christchurch Ave'
          onChange={formik.handleChange}
          value={formik.values.shipping_address.address1}
          error={
            formik.touched.shipping_address?.address1 &&
            Boolean(formik.errors.shipping_address?.address1)
          }
          helperText={
            formik.touched.shipping_address?.address1 &&
            formik.errors.shipping_address?.address1
          }
        />
        <Input
          id='shipping_address.zip'
          label='Zipcode'
          variant='secondary'
          placeholder='NW67PB'
          onChange={formik.handleChange}
          value={formik.values.shipping_address.zip}
          error={
            formik.touched.shipping_address?.zip &&
            Boolean(formik.errors.shipping_address?.zip)
          }
          helperText={
            formik.touched.shipping_address?.zip &&
            formik.errors.shipping_address?.zip
          }
        />
      </div>
      <div className='flex gap-4'>
        <Input
          id='shipping_address.address2'
          label='Complement'
          variant='secondary'
          placeholder='Block. 2, Apt. 3'
          onChange={formik.handleChange}
          value={formik.values.shipping_address.address2}
          error={
            formik.touched.shipping_address?.address2 &&
            Boolean(formik.errors.shipping_address?.address2)
          }
          helperText={
            formik.touched.shipping_address?.address2 &&
            formik.errors.shipping_address?.address2
          }
        />
        <Input
          id='shipping_address.city'
          label='City'
          variant='secondary'
          placeholder='London'
          onChange={formik.handleChange}
          value={formik.values.shipping_address.city}
          error={
            formik.touched.shipping_address?.city &&
            Boolean(formik.errors.shipping_address?.city)
          }
          helperText={
            formik.touched.shipping_address?.city &&
            formik.errors.shipping_address?.city
          }
        />
      </div>
      <div className='flex gap-4'>
        <Input
          id='shipping_address.province'
          label='State'
          variant='secondary'
          placeholder='London'
          onChange={formik.handleChange}
          value={formik.values.shipping_address.province}
          error={
            formik.touched.shipping_address?.province &&
            Boolean(formik.errors.shipping_address?.province)
          }
          helperText={
            formik.touched.shipping_address?.province &&
            formik.errors.shipping_address?.province
          }
        />
        <div className='flex w-full flex-col gap-2'>
          <p className='text-base'>Country</p>
          <OptionsSelector
            value={formik.values.shipping_address.country}
            options={[{ country: 'GB' }, { country: 'US' }, { country: 'BR' }]}
            placeholder='Pick your country'
            onOptionClick={(optionProps: { country: string }) => {
              handleCountryField(optionProps.country);
            }}
            optionLabelPath='country'
          />
        </div>
      </div>
    </div>
  );
};
