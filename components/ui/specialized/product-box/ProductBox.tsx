import Image from 'next/image';

import { formatPrice } from '@/lib/utils/utils';

import { ProductDataProps } from '@/types/product/product';

type ProductBoxProps = {
  productData: ProductDataProps;
};

export const ProductBox: React.FC<ProductBoxProps> = ({ productData }) => {
  return (
    <div className='flex w-full flex-col gap-4 transition-all duration-200 hover:opacity-70'>
      <div className='relative h-[25vw] w-full border border-black'>
        <Image
          src={productData.featuredImage.url}
          alt={productData.featuredImage.altText}
          className='object-cover'
          fill
        />
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
