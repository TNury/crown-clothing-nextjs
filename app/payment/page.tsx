import { redirect } from 'next/navigation';

import { CheckoutPaymentForm } from '@/components/ui/specialized/checkout-payment-form/CheckoutPaymentForm';
import OrderSummary from '@/components/ui/specialized/order-summary/OrderSummary';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { CheckoutSessionProps } from '@/types/checkout/checkout.types';

const Payment = async () => {
  const checkoutSession: CheckoutSessionProps = await retrieveCookie(
    'checkoutSession'
  );

  if (!checkoutSession) {
    redirect('/');
  }

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
          <div className='flex w-full flex-col gap-12 md:w-1/3'>
            <OrderSummary
              itemsQuantity={returnItemsQuantity()}
              itemsTotal={checkoutSession.lineItemsSubtotalPrice.amount}
              total={checkoutSession.totalPrice.amount}
            />
          </div>
          <div className='flex w-full flex-col gap-16 md:w-2/3'>
            <CheckoutPaymentForm checkoutSession={checkoutSession} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
