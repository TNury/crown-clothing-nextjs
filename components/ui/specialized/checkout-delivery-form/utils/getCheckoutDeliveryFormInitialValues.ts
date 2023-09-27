import {
  CheckoutDeliveryFormFieldProps,
  CheckoutSessionProps,
} from '@/types/checkout/checkout.types';

export function getCheckoutDeliveryFormInitialValue(
  checkoutSession: CheckoutSessionProps
): CheckoutDeliveryFormFieldProps {
  const { shippingAddress } = checkoutSession;

  return {
    shipping_address: {
      firstName: shippingAddress?.firstName ?? '',
      lastName: shippingAddress?.lastName ?? '',
      address1: shippingAddress?.address1 ?? '',
      address2: shippingAddress?.address2 ?? '',
      city: shippingAddress?.city ?? '',
      province: shippingAddress?.province ?? '',
      zip: shippingAddress?.zip ?? '',
      country: shippingAddress?.countryCodeV2 ?? '',
      phone: shippingAddress?.phone ?? '',
    },
    email: checkoutSession.email ?? '',
    // shipping_address: {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   address1: '67 Chirstchurch Ave',
    //   address2: '',
    //   city: 'London',
    //   province: 'England',
    //   zip: 'NW6 7PB',
    //   country: 'GB',
    //   phone: '+44 1234 567890',
    // },
    // email: 'JoeDoe@gmail.com',
  };
}
