'use client';

import Image from 'next/image';

import { CloseButton as RemoveButton } from '@/components/ui/generic/close-button/CloseButton';
import { OptionsSelector } from '@/components/ui/generic/options-selector/OptionsSelector';

import { removeCartItem, updateCartItem } from '@/actions/cart/cart.actions';

import { formatPrice } from '@/lib/utils/utils';

import { CartItemProps as ItemDataProps } from '@/types/cart/cart.types';

type CartItemProps = {
  cartId: string;
  itemData: ItemDataProps;
};

export const CartItem: React.FC<CartItemProps> = ({ cartId, itemData }) => {
  return (
    <div className='flex w-full border border-black'>
      <div className='relative h-64 w-64 min-w-[256px] border-r border-black'>
        <Image
          src={itemData.merchandise.image.url}
          alt={itemData.merchandise.product.title}
          fill
        />
      </div>
      <div className='relative flex w-full flex-col gap-4 p-4'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <p className='text-base'>{itemData.merchandise.product.title}</p>
            <p className='text-base'>Black / White</p>
          </div>
          <p className='mr-10 text-base'>
            {formatPrice(itemData.cost.totalAmount.amount, '€')}
          </p>
          <RemoveButton
            onClick={() =>
              removeCartItem({
                cartId,
                itemIds: itemData.id,
              })
            }
            className='absolute right-1 top-1'
          />
        </div>
        <p className='text-base'>Size: S</p>

        <div className='mt-auto w-fit'>
          <OptionsSelector
            value={itemData.quantity}
            options={[...Array(10)].map((_, index) => ({
              quantity: index + 1,
            }))}
            placeholder='Quantity'
            onOptionClick={(optionProps) => {
              updateCartItem({
                cartId,
                updateInfo: {
                  id: itemData.id,
                  quantity: optionProps.quantity,
                  merchandiseId: itemData.merchandise.id,
                },
              });
            }}
            optionLabelPath='quantity'
          />
        </div>
      </div>
    </div>
  );
};
