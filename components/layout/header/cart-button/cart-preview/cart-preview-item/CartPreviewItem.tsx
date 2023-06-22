import Image from 'next/image';

import { CartItemProps } from '@/types/cart/cart';

export const CartPreviewItem: React.FC = (props: CartItemProps) => {
  return (
    <div className='flex w-full'>
      <Image
        src={props.merchandise.image.url}
        width={60}
        height={80}
        alt={props.merchandise.image.url}
      />

      <div className='p-4 text-left text-base'>
        <p className='line-clamp-1'>{props.merchandise.product.title}</p>
        <p>{props.quantity} x €11</p>
      </div>
    </div>
  );
};
