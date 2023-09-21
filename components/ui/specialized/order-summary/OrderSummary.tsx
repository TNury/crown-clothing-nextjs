import { formatPrice } from '@/lib/utils/utils';

type OrderSummaryProps = {
  itemsQuantity: number;
  itemsTotal: number;
  total: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemsQuantity,
  itemsTotal,
  total,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-lg font-bold uppercase'>Order summary</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <p className='text-base'>{itemsQuantity} items:</p>
            <p className='text-base'>{formatPrice(itemsTotal)}</p>
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
          <p className='text-base font-bold'>{formatPrice(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
