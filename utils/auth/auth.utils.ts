import * as yup from 'yup';

import { especialCharRegex } from 'utils/regular-expressions/regularExpressions';

export const SignInFormValidationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Your email is required'),
  password: yup.string().required('Please enter your password'),
});

export const SignUpFormValidationSchema = yup.object({
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
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Your email is required'),
  password: yup
    .string()
    .min(6, 'Your passsword must contain at least 6 characters')
    .required('Please enter your password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});
