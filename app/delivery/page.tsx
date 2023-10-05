import { CheckoutDeliveryForm } from '@/components/ui/specialized/checkout-delivery-form/CheckoutDeliveryForm';
import OrderDetails from '@/components/ui/specialized/order-details/OrderDetails';
import OrderSummary from '@/components/ui/specialized/order-summary/OrderSummary';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { UserSessionProps } from '@/types/auth/auth.types';
import { CheckoutSessionProps } from '@/types/checkout/checkout.types';

const DeliveryPage = async () => {
  const checkoutSession: CheckoutSessionProps = await retrieveCookie(
    'checkoutSession'
  );

  const userSession: UserSessionProps = await retrieveCookie('userSession');

  const returnItemsQuantity = (): number => {
    let totalQuantity = 0;

    checkoutSession.lineItems.nodes.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  };

  return (
    <main className='flex w-full flex-col items-center justify-center px-4 py-16'>
      <div className='w-full max-w-screen-md'>
        <div className='flex w-full flex-col gap-8 md:flex-row-reverse'>
          <div className='flex-col gap-12 flex md:w-1/3'>
            <OrderSummary
              itemsQuantity={returnItemsQuantity()}
              itemsTotal={checkoutSession.lineItemsSubtotalPrice.amount}
              total={checkoutSession.totalPrice.amount}
            />
            <OrderDetails checkoutSession={checkoutSession} />
          </div>
          <div className='md:w-2/3'>
            <CheckoutDeliveryForm
              checkoutSession={checkoutSession}
              userSession={userSession}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeliveryPage;
