'use client';

import { FormikProps } from 'formik';
import _ from 'lodash';

import { Input } from '@/components/ui/generic/input/Input';
import { OptionsSelector } from '@/components/ui/generic/options-selector/OptionsSelector';

import {
  CheckoutBillingFormFieldProps,
  CheckoutDeliveryFormFieldProps,
} from '@/types/checkout/checkout.types';

type AddressFormGroupProps = {
  formik: FormikProps<
    CheckoutDeliveryFormFieldProps | CheckoutBillingFormFieldProps
  >;
  path?: string;
};

export const AddressFormGroup: React.FC<AddressFormGroupProps> = ({
  formik,
  path,
}) => {
  const returnId = (fieldName: string) => {
    if (path) {
      return `${path}.${fieldName}`;
    } else {
      return fieldName;
    }
  };

  /*
    The returnPathValue function is used to retrieve the value of a specific field in 
    the formik object. It takes two arguments: key and fieldName. 
    The key is used to specify the object in the formik object that contains 
    the field value, while the fieldName argument is used to specify the name of the 
    field whose value is being retrieved. The function then returns the value of the 
    specified field.
  */
  const returnPathValue = (key: string, fieldName: string) => {
    let pathValue: any;

    if (path) {
      const pathsArray = [];

      path.split('.').forEach((entry) => {
        pathsArray.push(entry);
      });

      pathValue = _.get(formik[key], pathsArray)?.[fieldName];

      return pathValue;
    } else {
      pathValue = formik[key]?.[fieldName];

      return pathValue;
    }
  };

  const handleCountryField = (value: string) => {
    if (path) {
      formik.setFieldValue(`${path}.country`, value);
    } else {
      formik.setFieldValue('country', value);
    }
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full gap-4'>
        <Input
          id={returnId('firstName')}
          label='First name'
          placeholder='John'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'firstName')}
          error={
            returnPathValue('touched', 'firstName') &&
            Boolean(returnPathValue('errors', 'firstName'))
          }
          helperText={
            returnPathValue('touched', 'firstName') &&
            returnPathValue('errors', 'firstName')
          }
        />
        <Input
          id={returnId('lastName')}
          label='Last name'
          placeholder='Doe'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'lastName')}
          error={
            returnPathValue('touched', 'lastName') &&
            Boolean(returnPathValue('errors', 'lastName'))
          }
          helperText={
            returnPathValue('touched', 'lastName') &&
            returnPathValue('errors', 'lastName')
          }
        />
      </div>
      <div className='flex gap-4'>
        <Input
          id={returnId('address1')}
          label='Street'
          placeholder='123 Main St'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'address1')}
          error={
            returnPathValue('touched', 'address1') &&
            Boolean(returnPathValue('errors', 'address1'))
          }
          helperText={
            returnPathValue('touched', 'address1') &&
            returnPathValue('errors', 'address1')
          }
        />
        <Input
          id={returnId('zip')}
          label='Zipcode'
          placeholder='123 456'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'zip')}
          error={
            returnPathValue('touched', 'zip') &&
            Boolean(returnPathValue('errors', 'zip'))
          }
          helperText={
            returnPathValue('touched', 'zip') &&
            returnPathValue('errors', 'zip')
          }
        />
      </div>
      <div className='flex gap-4'>
        <Input
          id={returnId('address2')}
          label='Complement'
          placeholder='Flat 2'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'address2')}
          error={
            returnPathValue('touched', 'address2') &&
            Boolean(returnPathValue('errors', 'address2'))
          }
          helperText={
            returnPathValue('touched', 'address2') &&
            returnPathValue('errors', 'address2')
          }
        />
        <Input
          id={returnId('city')}
          label='City'
          placeholder='London'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'city')}
          error={
            returnPathValue('touched', 'city') &&
            Boolean(returnPathValue('errors', 'city'))
          }
          helperText={
            returnPathValue('touched', 'city') &&
            returnPathValue('errors', 'city')
          }
        />
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <Input
          id={returnId('province')}
          label='Province'
          placeholder='England'
          onChange={formik.handleChange}
          value={returnPathValue('values', 'province')}
          error={
            returnPathValue('touched', 'province') &&
            Boolean(returnPathValue('errors', 'province'))
          }
          helperText={
            returnPathValue('touched', 'province') &&
            returnPathValue('errors', 'province')
          }
        />
        <div className='flex w-full flex-col gap-2'>
          <p className='text-base'>Country</p>
          <OptionsSelector
            value={returnPathValue('values', 'country')}
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
