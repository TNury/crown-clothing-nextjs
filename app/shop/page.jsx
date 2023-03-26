import { fetchShopPageEntries } from 'services/firebase';

import { ProductBox } from './Product';

const ShopPage = async () => {
  const shopPageEntries = await fetchShopPageEntries();

  return (
    <main id='shop' className='px-4 py-16 flex flex-col gap-16 md:px-16'>
      {shopPageEntries.map((entry, index) => (
        <section key={index} className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold uppercase cursor-pointer'>
            {entry.title}
          </h2>
          <div className='flex gap-4 flex-wrap'>
            {entry.items.map((productData) => (
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
