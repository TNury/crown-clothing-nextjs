import { staticData } from './staticData';

const Shop = () => {
  return (
    <main id='shop' className='px-4 py-16 flex flex-col gap-16 md:px-16'>
      {staticData.map((entry) => (
        <section key={entry.id} className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold uppercase cursor-pointer'>
            {entry.title}
          </h2>
          <div className='flex gap-4 flex-wrap'>
            {entry.products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className='h-[25vw] flex-auto flex flex-col gap-4 cursor-pointer'
              >
                <div className='group w-full h-5/6 border border-black relative'>
                  <img
                    src={product.imageUrl}
                    className='w-full h-full object-cover'
                  />
                  <div className='py-4 px-8 flex items-end absolute inset-0 bg-opaque-white-30 opacity-0 group-hover:opacity-100 transition-all duration-200'>
                    <button className='w-full p-4 bg-opaque-white-90 border border-black text-base font-bold uppercase transition-all duration-200 text-black hover:bg-black hover:text-white'>
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <p className='text-lg'>{product.name}</p>
                  <p className='text-lg'>€{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Shop;
