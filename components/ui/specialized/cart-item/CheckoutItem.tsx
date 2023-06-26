import Image from 'next/image';

import { CartItemProps } from '@/types/cart/cart';

export const CartItem: React.FC<CartItemProps> = (props) => {
  return (
    <div className='flex items-center border-b border-darkgray py-4 text-center'>
      <div className='relative w-[23%] h-52'>
        <Image
          src={props.merchandise.image.url}
          alt={props.merchandise.image.url}
          fill
        />
      </div>
      <div className='flex w-[23%] items-center justify-center'>
        <p className='text-xl'>{props.merchandise.product.title}</p>
      </div>
      <div className='flex w-[23%] items-center justify-center gap-2'>
        <button className='cursor-pointer px-2'>&#10094;</button>
        <p className='w-4 text-xl'>{props.quantity}</p>
        <button className='cursor-pointer px-2'>&#10095;</button>
      </div>
      <div className='flex w-[23%] items-center justify-center'>
        <p className='text-xl'>€{props.cost.totalAmount.amount}</p>
      </div>
      <div className='flex w-[23%] items-center justify-center'>
        <button className='px-2 text-xl'>&#10005;</button>
      </div>
    </div>
  );
};
