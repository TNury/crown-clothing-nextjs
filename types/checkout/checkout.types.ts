import {
  CheckoutPropsFragment,
  CompleteCheckoutMutation,
  CreateCheckoutMutation,
  CreateCheckoutMutationVariables,
  TokenizedPaymentInputV3,
  UpdateCheckoutContactEmailMutation,
  UpdateCheckoutContactEmailMutationVariables,
  UpdateCheckoutShippingAddressMutation,
  UpdateCheckoutShippingAddressMutationVariables,
} from '@/types/queries/queries';

export type GetClientSecretArgs = {
  amount: number;
  currency: string;
  payment_method_types: string[];
};

export type CreateCheckoutArgs = CreateCheckoutMutationVariables;

export type CreateCheckoutResponse = CreateCheckoutMutation;

export type CheckoutSessionProps = CheckoutPropsFragment & {
  clientSecret?: string;
};

export type UpdateCheckoutShippingAddressArgs =
  UpdateCheckoutShippingAddressMutationVariables;

export type UpdateCheckoutShippingAddressResponse =
  UpdateCheckoutShippingAddressMutation;

export type UpdateCheckoutContactEmailArgs =
  UpdateCheckoutContactEmailMutationVariables;

export type UpdateCheckoutContactEmailResponse =
  UpdateCheckoutContactEmailMutation;

export type CheckoutDeliveryFormFieldProps = {
  shipping_address: UpdateCheckoutShippingAddressArgs['input'];
  email: UpdateCheckoutContactEmailArgs['input'];
};

export type CompleteCheckoutArgs = {
  paymentData: string;
};

export type CompleteCheckoutResponse = CompleteCheckoutMutation;
