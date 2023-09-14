import {
  CheckoutPropsFragment,
  CreateCheckoutMutation,
  CreateCheckoutMutationVariables,
  UpdateCheckoutContactEmailMutation,
  UpdateCheckoutContactEmailMutationVariables,
  UpdateCheckoutShippingAddressMutation,
  UpdateCheckoutShippingAddressMutationVariables,
} from '@/types/queries/queries';

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
  shipping_address: UpdateCheckoutShippingAddressArgs['input'];
  email: UpdateCheckoutContactEmailArgs['input'];
};
