import Link from 'next/link';

import SignInForm from '@/components/SignInForm';
import { Button } from '@/components/ui/generic/button/Button';
import { CartItem } from '@/components/ui/specialized/cart-item/CartItem';
import CheckoutButton from '@/components/ui/specialized/checkout-button/CheckoutButton';
import OrderSummary from '@/components/ui/specialized/order-summary/OrderSummary';

import { retrieveCookie } from '@/actions/cookies/cookies';

import { formatPrice } from '@/lib/utils/utils';

import { UserSessionProps } from '@/types/auth/auth.types';
import { CartSessionProps } from '@/types/cart/cart.types';

const BagPage = async () => {
  const cartSession: CartSessionProps = await retrieveCookie('cartSession');
  const userSession: UserSessionProps = await retrieveCookie('userSession');

  return (
    <main className='flex w-full flex-col items-center justify-center px-4 py-16'>
      <div className='w-full max-w-screen-md'>
        {cartSession?.lines.nodes.length > 0 ? (
          <div className='flex w-full flex-col gap-8 md:flex-row'>
            <div className='flex w-full flex-col gap-8 md:w-2/3'>
              {userSession && (
                <div className='bg-gray-1 p-8'>
                  <h2 className='text-lg font-bold uppercase'>
                    Hello {userSession.user.firstName}
                  </h2>
                </div>
              )}
              <div className='flex flex-col gap-4'>
                <h1 className='text-4xl font-bold uppercase'>Your bag</h1>
                <p className='text-base'>
                  Total:{' '}
                  <span className='text-base font-bold'>
                    {formatPrice(cartSession.cost.totalAmount.amount)}
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
            <div className='flex w-full flex-col gap-8 md:w-1/3'>
              {!userSession && (
                <>
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-4xl font-bold uppercase'>Log in</h1>
                    <p className='mb-[-7px] text-base'>
                      Please log in to continue to checkout.
                    </p>
                  </div>
                  <SignInForm returnUrl='/bag' />
                </>
              )}

              <div className='flex flex-col gap-12 md:flex-col-reverse'>
                <OrderSummary
                  itemsQuantity={cartSession.totalQuantity}
                  itemsTotal={cartSession.cost.totalAmount.amount}
                  total={cartSession.cost.totalAmount.amount}
                />

                {userSession && <CheckoutButton cartSession={cartSession} />}
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

export default BagPage;
