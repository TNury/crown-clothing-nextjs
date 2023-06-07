import Link from 'next/link';

import callAPI from '@services/api';
import { ProductBox } from 'components/product-box/ProductBox';

const ShopPage = async () => {
  const { collections: shopPageQuery } = await callAPI(
    'services/queries/collections.graphql',
    'shopPageQuery'
  );

  return (
    <main id='shop' className='flex flex-col gap-16 px-4 py-16 md:px-16'>
      {shopPageQuery.nodes.map((entry, index) => (
        <section key={index} className='flex flex-col gap-4'>
          <Link
            href={`shop/${entry.handle}`}
            className='cursor-pointer text-3xl font-bold uppercase'>
            {entry.title}
          </Link>
          <div className='grid w-full grid-cols-4 gap-4'>
            {entry.products.nodes.map((productData, index) => (
              <ProductBox key={index} productData={productData} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default ShopPage;
