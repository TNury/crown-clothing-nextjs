import Link from 'next/link';

import { ProductBox } from '@/components/ui/specialized/product-box/ProductBox';

import {
  getCategorySlug,
  getCategorySlugParams,
} from '@/actions/pages/pages.actions';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const params = await getCategorySlugParams();

  const categorySlugParams = params.map((entry) => ({
    categorySlug: entry.handle,
  }));

  return categorySlugParams;
}

type CategorySlugProps = {
  params: {
    categorySlug: string;
  };
};

const CategorySlug: React.FC<CategorySlugProps> = async ({
  params: { categorySlug },
}) => {
  const categorySlugProps = await getCategorySlug(categorySlug);

  return (
    <main className='flex flex-col items-center gap-6 px-4 py-16 md:pl-16 md:pr-12'>
      <h1 className='text-4xl font-bold uppercase'>
        {categorySlugProps.title}
      </h1>
      <section className='grid w-full grid-cols-4 gap-4'>
        {categorySlugProps.products.nodes.map((productData, index) => (
          <Link
            href={`/shop/${categorySlug}/${productData.handle}`}
            key={index}>
            <ProductBox productData={productData} />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default CategorySlug;
