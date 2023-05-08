'use client';

import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/cart/cart.reducer';
import { formatPrice } from '@/utils/misc/formatPrice';

export const ProductBox = ({ productData }) => {
  const dispatch = useDispatch();

  const triggerItemAddition = () => {
    dispatch(addItem(productData));
  };

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className='group w-full h-5/6 border border-black relative cursor-pointer'>
        <img
          src={productData.featuredImage.src}
          className='w-full h-full object-cover'
        />
        <div className='py-4 px-8 flex items-end absolute inset-0 bg-opaque-white-30 opacity-0 group-hover:opacity-100 transition-all duration-200'>
          <button
            onClick={triggerItemAddition}
            className='w-full p-4 bg-opaque-white-90 border border-black text-base font-bold uppercase transition-all duration-200 text-black hover:bg-black hover:text-white'
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className='flex justify-between'>
        <p className='text-lg'>{productData.title}</p>
        <p className='text-lg'>
          {formatPrice(productData.priceRange.minVariantPrice.amount, '€')}
        </p>
      </div>
    </div>
  );
};
