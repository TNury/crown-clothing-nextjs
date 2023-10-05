import Image from 'next/image';

import { formatPrice } from '@/lib/utils/utils';

import { ProductDataProps } from '@/types/product/product';

type ProductBoxProps = {
  productData: ProductDataProps;
};

export const ProductBox: React.FC<ProductBoxProps> = ({ productData }) => {
  return (
    <div className='flex w-full flex-col gap-2 transition-all duration-200 hover:opacity-70'>
      <div className='relative h-[50vw] w-full border border-black md:h-[25vw]'>
        <Image
          src={productData.featuredImage.url}
          alt={productData.title}
          className='object-cover'
          fill
        />
      </div>
      <div className='flex flex-col'>
        <p className='text-lg'>{productData.title}</p>
        <p className='text-lg text-gray-3'>
          {formatPrice(productData.priceRange.minVariantPrice.amount)}
        </p>
      </div>
    </div>
  );
};
