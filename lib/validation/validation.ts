import * as yup from 'yup';

import { especialCharRegex } from '@/lib/regular-expressions/regularExpressions';

const addressFields = {
  firstName: yup
    .string()
    .matches(especialCharRegex, {
      message: 'Invalid character',
    })
    .required('Your first name is required'),
  lastName: yup
    .string()
    .matches(especialCharRegex, {
      message: 'Invalid character',
    })
    .required('Your last name is required'),
  address1: yup.string().required('Your address is required'),
  zip: yup.string().required('Your zip code is required'),
  city: yup.string().required('Your city is required'),
  province: yup.string().required('Your province is required'),
  country: yup.string().required('Your country is required'),
};

export const billingAddressFormSchema = yup.object({
  ...addressFields,
});

export const addressFormSchema = yup.object({
  ...addressFields,
  phone: yup.string().required('Your phone number is required'),
});

export const checkoutDeliveryFormSchema = yup.object({
  shipping_address: addressFormSchema,
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Your email is required'),
});
