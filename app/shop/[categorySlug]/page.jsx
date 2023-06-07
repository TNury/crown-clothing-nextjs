import callAPI from '@services/api';

import { ProductBox } from '@/components/product-box/ProductBox';

const CategorySlug = async ({ params: { categorySlug } }) => {
  const { collectionByHandle: categorySlugProps } = await callAPI(
    'services/queries/collections.graphql',
    'categorySlugCollection',
    {
      handle: categorySlug,
    }
  );

  return (
    <main className='flex flex-col items-center gap-6 px-4 py-16 md:pl-16 md:pr-12'>
      <h1 className='text-4xl font-bold uppercase'>
        {categorySlugProps.title}
      </h1>
      <section className='grid w-full grid-cols-4 gap-4'>
        {categorySlugProps.products.nodes.map((productData, index) => (
          <ProductBox key={index} productData={productData} />
        ))}
      </section>
    </main>
  );
};

export default CategorySlug;

// export async function generateStaticParams() {
//   const response = await callAPI(
//     'services/queries/collections.graphql',
//     'categorySlugParams'
//   );

//   const categorySlugParams = response.collections.nodes.map((entry) => ({
//     categorySlug: entry.handle,
//   }));

//   return categorySlugParams;
// }
