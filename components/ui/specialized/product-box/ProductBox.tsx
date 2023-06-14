import Image from 'next/image';

import AddToCart from '@/components/ui/specialized/add-to-cart/AddToCart';

import { formatPrice } from '@/utils/misc/formatPrice';

import { ProductDataProps } from '@/types/product/product';

type ProductBoxProps = {
  productData: ProductDataProps;
};

export const ProductBox: React.FC<ProductBoxProps> = ({ productData }) => {
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='group relative w-full cursor-pointer border border-black'>
        <div className='h-[25vw] w-full relative'>
          <Image
            src={productData.featuredImage.url}
            alt={productData.featuredImage.altText}
            className='object-cover'
            fill
          />
        </div>
        <div className='absolute inset-0 flex items-end bg-opaque-white-30 px-8 py-4 opacity-0 transition-all duration-200 group-hover:opacity-100'>
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
