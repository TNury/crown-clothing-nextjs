import Image from 'next/image';

import { formatPrice } from '@/lib/utils/utils';

import { CheckoutSessionProps } from '@/types/checkout/checkout.types';

type OrderSummaryProps = {
  checkoutSession: CheckoutSessionProps;
};

const OrderDetails: React.FC<OrderSummaryProps> = ({ checkoutSession }) => {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-lg font-bold uppercase'>Order details</h1>
      <div className='flex w-full flex-col gap-4'>
        {checkoutSession.lineItems.nodes.map((entry, index) => (
          <div key={index} className='flex w-full gap-4'>
            <div className='relative h-36 w-36'>
              <Image src={entry.variant.image.url} alt={entry.title} fill />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col'>
                <p className='text-base'>{entry.title}</p>
                <p className='text-base'>
                  {formatPrice(entry.variant.price.amount, '€')}
                </p>
              </div>

              <div className='flex justify-between'>
                <p className='text-base'>Quantity: {entry.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
