import Image from 'next/image';

import callAPI from '@/services/api';

import { ProductDetails } from '@/components/ui/specialized/product-details/ProductDetails';

import { ProductSlugQuery } from '@/types/queries/queries';

type ProductSlugProps = {
  params: {
    productSlug: string;
  };
  searchParams: Record<string, any>;
};

const ProductSlug = async (props: ProductSlugProps) => {
  const {
    params: { productSlug },
  } = props;

  const response: ProductSlugQuery = await callAPI(
    'ProductSlug',
    {
      handle: productSlug,
    },
    {
      cache: 'no-cache',
    }
  );

  const { productByHandle: productData } = response;

  return (
    <main className='flex px-4 py-16'>
      <div className='flex w-[75vw] gap-4'>
        <div className='grid w-full grid-cols-2 gap-[1px]'>
          {productData.images.nodes.map((imageProps, index) => (
            <div key={index} className='relative h-[40vw] w-full bg-gray-400'>
              <Image src={imageProps.url} alt={imageProps.url} fill />
            </div>
          ))}
        </div>
      </div>
      <ProductDetails productData={productData} />
    </main>
  );
};

export default ProductSlug;
