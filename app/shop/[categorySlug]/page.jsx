import {
  fetchCategorySlugProps,
  fetchCategorySlugParams,
} from '@services/firebase';

import { ProductBox } from '@/components/ProductBox';

const CategorySlug = async ({ params: { categorySlug } }) => {
  const categorySlugProps = await fetchCategorySlugProps(categorySlug);

  return (
    <main className='px-4 py-16 flex flex-col items-center gap-6 md:pl-16 md:pr-12'>
      <h1 className='text-4xl font-bold uppercase'>{categorySlug}</h1>
      <section className='w-full flex flex-wrap'>
        {categorySlugProps.items.map((productData, index) => (
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
  const categorySlugParams = await fetchCategorySlugParams();

  return categorySlugParams;
}
