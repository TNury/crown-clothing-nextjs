import callAPI from '@/services/api';

import { ProductBox } from '@/components/ui/specialized/product-box/ProductBox';

import { CategorySlugCollectionQuery } from '@/types/queries/queries';

const CategorySlug = async ({ params: { categorySlug } }) => {
  const response: CategorySlugCollectionQuery = await callAPI(
    'CategorySlugCollection',
    {
      handle: categorySlug,
    }
  );

  const { collectionByHandle: categorySlugProps } = response;

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
