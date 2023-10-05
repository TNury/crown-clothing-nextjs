import Link from 'next/link';

import { ProductBox } from '@/components/ui/specialized/product-box/ProductBox';

import { getShopPage } from '@/actions/pages/pages.actions';

const ShopPage = async () => {
  const response = await getShopPage();

  return (
    <main id='shop' className='flex flex-col gap-16 px-4 py-16 md:px-16'>
      {response.map((entry, index) => (
        <section key={index} className='flex flex-col gap-4'>
          <Link
            href={`shop/${entry.handle}`}
            className='cursor-pointer text-3xl font-bold uppercase'>
            {entry.title}
          </Link>
          <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-4'>
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
