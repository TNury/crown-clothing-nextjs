import { ProductBox } from '@/components/ProductBox';

import callAPI from '@services/api';

const CategorySlug = async ({ params: { categorySlug } }) => {
  const { collectionByHandle: categorySlugProps } = await callAPI(
    'services/queries/collections.graphql',
    'categorySlugCollection',
    {
      handle: categorySlug,
    }
  );

  return (
    <main className='px-4 py-16 flex flex-col items-center gap-6 md:pl-16 md:pr-12'>
      <h1 className='text-4xl font-bold uppercase'>
        {categorySlugProps.title}
      </h1>
      <section className='w-full flex flex-wrap'>
        {categorySlugProps.products.nodes.map((productData, index) => (
          <div key={index} className='min-w-[25%] h-[25vw] pr-4 mb-8'>
            <ProductBox productData={productData} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default CategorySlug;

export async function generateStaticParams() {
  const response = await callAPI(
    'services/queries/collections.graphql',
    'categorySlugParams'
  );

  const categorySlugParams = response.collections.nodes.map((entry) => ({
    categorySlug: entry.handle,
  }));

  return categorySlugParams;
}
