import * as yup from 'yup';

export const SignInFormValidationSchema = yup.object({
  email: yup
    .string('')
    .email('Please enter a valid email')
    .required('Your email is required'),
  password: yup.string('').required('Please enter your password'),
});
