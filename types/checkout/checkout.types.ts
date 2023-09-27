import {
  CheckoutPropsFragment,
  CompleteCheckoutMutation,
  CreateCheckoutMutation,
  CreateCheckoutMutationVariables,
  MailingAddressInput,
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

export type CheckoutSessionProps = CheckoutPropsFragment;

export type UpdateCheckoutShippingAddressArgs =
  UpdateCheckoutShippingAddressMutationVariables;

export type UpdateCheckoutShippingAddressResponse =
  UpdateCheckoutShippingAddressMutation;

export type UpdateCheckoutContactEmailArgs =
  UpdateCheckoutContactEmailMutationVariables;

export type UpdateCheckoutContactEmailResponse =
  UpdateCheckoutContactEmailMutation;

export type CheckoutDeliveryFormFieldProps = {
  shipping_address: MailingAddressInput;
  email: UpdateCheckoutContactEmailArgs['input'];
};

export type CheckoutBillingFormFieldProps = MailingAddressInput;

export type CompleteCheckoutArgs = TokenizedPaymentInputV3;

export type CompleteCheckoutResponse = CompleteCheckoutMutation;
