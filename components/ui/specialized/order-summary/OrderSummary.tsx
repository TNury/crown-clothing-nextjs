import { formatPrice } from '@/lib/utils/utils';

import { CartSessionProps } from '@/types/cart/cart.types';

type OrderSummaryProps = {
  cartSession: CartSessionProps;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartSession }) => {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-lg font-bold uppercase'>Order summary</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <p className='text-base'>{cartSession.totalQuantity} items: </p>
            <p className='text-base'>
              {formatPrice(cartSession.cost.totalAmount.amount, '€')}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className='text-base'>Sales Tax:</p>
            <p className='text-base'>-</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-base'>Delivery:</p>
            <p className='text-base'>Free</p>
          </div>
        </div>
        <div className='flex justify-between'>
          <p className='text-base font-bold'>Total: </p>
          <p className='text-base font-bold'>
            {formatPrice(cartSession.cost.totalAmount.amount, '€')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
