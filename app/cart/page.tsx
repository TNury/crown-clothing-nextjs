import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/generic/button/Button';
import { CloseButton } from '@/components/ui/generic/close-button/CloseButton';
import { OptionsSelector } from '@/components/ui/generic/options-selector/OptionsSelector';
import { CartItem } from '@/components/ui/specialized/cart-item/CartItem';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { formatPrice } from '@/lib/utils/utils';

import { CartSessionProps } from '@/types/cart/cart.types';

const CartPage = async () => {
  const cartSession: CartSessionProps = await retrieveCookie('cartSession');

  return (
    <main className='flex w-full flex-col items-center justify-center px-4 py-16'>
      <div className='w-full max-w-screen-md'>
        {cartSession?.lines.nodes.length > 0 ? (
          <div className='flex w-full gap-8'>
            <div className='flex w-2/3 flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <h1 className='text-4xl font-bold uppercase'>Your bag</h1>
                <p className='text-base'>
                  Total:{' '}
                  <span className='text-base font-bold'>
                    {formatPrice(cartSession.cost.totalAmount.amount, '€')}
                  </span>{' '}
                  ({cartSession.totalQuantity} items)
                </p>
              </div>
              <div className='flex w-full flex-col gap-4'>
                {cartSession.lines.nodes.map((entry, index: number) => (
                  <CartItem
                    key={index}
                    cartId={cartSession.id}
                    itemData={entry}
                  />
                ))}
              </div>
            </div>
            <div className='flex w-1/3 flex-col gap-12'>
              <Button className='flex items-center justify-between'>
                <p className='text-base'>Checkout</p>
                <span className='h-8 text-lg'>&#8594;</span>
              </Button>
              <div className='flex flex-col gap-8'>
                <h1 className='text-lg font-bold uppercase'>Order summary</h1>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col'>
                    <div className='flex justify-between'>
                      <p className='text-base'>
                        {cartSession.totalQuantity} items:{' '}
                      </p>
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
            </div>
          </div>
        ) : (
          <div className='flex w-full flex-col gap-4'>
            <h1 className='text-4xl font-bold uppercase'>Your bag is empty</h1>
            <p className='text-base'>
              Once you add something to your bag, it will appear here. Ready to
              get started?
            </p>
            <Link href='/'>
              <Button className='flex w-fit items-center justify-between gap-4'>
                <p className='text-base'>Get started</p>
                <span className='h-8 text-lg'>&#8594;</span>
              </Button>{' '}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
