import Link from 'next/link';

import { ProductBox } from '@/components/product-box/ProductBox';

import callAPI from '@services/api';

const ShopPage = async () => {
  const { collections: shopPageQuery } = await callAPI(
    'services/queries/collections.graphql',
    'shopPageQuery'
  );

  return (
    <main id='shop' className='px-4 py-16 flex flex-col gap-16 md:px-16'>
      {shopPageQuery.nodes.map((entry, index) => (
        <section key={index} className='flex flex-col gap-4'>
          <Link
            href={`shop/${entry.handle}`}
            className='text-3xl font-bold uppercase cursor-pointer'
          >
            {entry.title}
          </Link>
          <div className='flex gap-4 flex-wrap'>
            {entry.products.nodes.map((productData) => (
              <div key={productData.id} className='h-[25vw] flex-auto'>
                <ProductBox productData={productData} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default ShopPage;
