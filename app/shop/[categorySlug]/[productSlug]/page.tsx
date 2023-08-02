import Image from 'next/image';

import { ProductDetails } from '@/components/ui/specialized/product-details/ProductDetails';

import {
  getProductSlug,
  getProductSlugParams,
} from '@/actions/pages/pages.actions';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const collections = await getProductSlugParams();

  const result = [];

  // Iterate over the collections nodes and extract the required data
  for (const collection of collections) {
    const categorySlug = collection.handle;

    // Extract the products nodes
    const products = collection.products.nodes;

    // Iterate over the products nodes and push data to the result array
    for (const product of products) {
      const productSlug = product.handle;
      result.push({ categorySlug, productSlug });
    }
  }

  return result;
}

type ProductSlugProps = {
  params: {
    productSlug: string;
  };
};

const ProductSlug = async (props: ProductSlugProps) => {
  const {
    params: { productSlug },
  } = props;

  const productData = await getProductSlug(productSlug);

  return (
    <main className='flex px-4 py-16'>
      <div className='flex w-[75vw] gap-4'>
        <div className='grid w-full grid-cols-2 gap-1'>
          {productData.images.nodes.map((imageProps, index) => (
            <div
              key={index}
              className='relative h-[40vw] w-full border border-black bg-gray-400'>
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
