'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/generic/button/Button';

import { addItemToCart, createCart } from '@/actions/cart/cart';
import { retrieveCookie } from '@/actions/cookies/cookies';

import { formatPrice } from '@/lib/utils/utils';

import { CartSessionProps } from '@/types/cart/cart';
import { GetProductSlugResponse } from '@/types/pages/pages.types';

type ProductDetaisProps = {
  productData: GetProductSlugResponse['productByHandle'];
};

const mockedSizes = [
  {
    id: '0',
    title: 'XS',
  },
  {
    id: '1',
    title: 'S',
  },
  {
    id: '2',
    title: 'M',
  },
  {
    id: '3',
    title: 'L',
  },
  {
    id: '3',
    title: 'XL',
  },
];

const mockedColors = [
  {
    color: 'bg-gray-100',
  },
  {
    color: 'bg-gray-200',
  },
  {
    color: 'bg-gray-300',
  },
  {
    color: 'bg-gray-400',
  },
  {
    color: 'bg-gray-500',
  },
];

export const ProductDetails: React.FC<ProductDetaisProps> = ({
  productData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // You were wondering if you could keep the generateStaticParams for productSlug
  // while also having nested components that relied on actions that called upon cookies
  const handleAddToCart = async () => {
    setLoading(true);

    const merchandiseId = productData.variants.nodes[0].id;

    const existingCartSession: CartSessionProps = await retrieveCookie(
      'cartSession'
    );

    if (!existingCartSession) {
      await createCart(merchandiseId);
    } else {
      await addItemToCart(existingCartSession.id, merchandiseId);
    }

    setTimeout(() => {
      router.refresh();
    });

    setLoading(false);
  };

  return (
    <div className='sticky top-20 flex h-fit w-[25vw] flex-col gap-8 p-8 pr-4 lg:p-16 lg:pr-12'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-4xl font-bold'>{productData.title}</h1>
        <p className='text-2xl font-bold'>
          {formatPrice(productData.priceRange.minVariantPrice.amount, '€')}
        </p>
        <p className='mt-2 text-base'>{productData.description}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-base font-bold'>Size</p>
        <div className='grid grid-cols-5 gap-1'>
          {mockedSizes.map((props: any, index) => (
            <Button key={index} variant='secondary' className='text-center'>
              {props.title}
            </Button>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-base font-bold'>Colors</p>
        <div className='grid grid-cols-5 gap-1'>
          {mockedColors.map((props: any, index) => (
            <div
              key={index}
              className={`h-16 cursor-pointer ${props.color} transition-all duration-200 hover:opacity-50`}
            />
          ))}
        </div>
      </div>
      <Button disabled={loading} className='mt-8' onClick={handleAddToCart}>
        Add to cart
      </Button>
    </div>
  );
};
