import { formatPrice } from '@/utils/misc/formatPrice';

import AddToCart from '../ui/specialized/add-to-cart/AddToCart';

export const ProductBox = ({ productData }) => {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className='group w-full h-5/6 border border-black relative cursor-pointer'>
        <img
          src={productData.featuredImage.src}
          className='w-full h-full object-cover'
        />
        <div className='py-4 px-8 flex items-end absolute inset-0 bg-opaque-white-30 opacity-0 group-hover:opacity-100 transition-all duration-200'>
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
