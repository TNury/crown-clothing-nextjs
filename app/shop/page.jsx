import { ProductBox } from './Product';

import { staticData } from './staticData';

const ShopPage = () => {
  return (
    <main id='shop' className='px-4 py-16 flex flex-col gap-16 md:px-16'>
      {staticData.map((entry) => (
        <section key={entry.id} className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold uppercase cursor-pointer'>
            {entry.title}
          </h2>
          <div className='flex gap-4 flex-wrap'>
            {entry.products.slice(0, 4).map((productData) => (
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
