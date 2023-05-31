import { formatPrice } from '@/utils/misc/formatPrice';

import AddToCart from '../ui/specialized/add-to-cart/AddToCart';

export const ProductBox = ({ productData }) => {
  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <div className='group relative h-5/6 w-full cursor-pointer border border-black'>
        <img
          src={productData.featuredImage.src}
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 flex items-end bg-opaque-white-30 py-4 px-8 opacity-0 transition-all duration-200 group-hover:opacity-100'>
          <AddToCart productData={productData} />
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
