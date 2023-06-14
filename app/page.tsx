import Image from 'next/image';
import Link from 'next/link';

import callAPI from '@/services/api';

import type { HomepageCollectionsQuery } from '@/types/queries/queries';

const Home = async () => {
  const response: HomepageCollectionsQuery = await callAPI(
    'HomepageCollections'
  );

  const { collections: homepageCollections } = response;

  return (
    <div
      id='home'
      className='flex min-h-[calc(100vh-5rem)] items-center justify-center'>
      <section
        id='categories'
        className='flex w-full max-w-screen-xl flex-wrap justify-between gap-4 px-4 md:px-16'>
        {homepageCollections.nodes.map((entry) => (
          <Link
            href={`shop/${entry.handle}`}
            key={entry.id}
            className='group relative flex h-60 min-w-[30%] flex-auto cursor-pointer items-center justify-center overflow-hidden border border-black xl:h-80 [&:nth-child(4)]:flex-1 [&:nth-child(5)]:flex-1'>
            <Image
              src={entry.image.url}
              alt={entry.image.altText}
              className='-z-10 object-cover transition-all duration-1000 group-hover:scale-110'
              fill
            />
            <div className='flex h-24 flex-col items-center gap-4 border border-black bg-white px-6 opacity-70 transition-all duration-500 group-hover:opacity-90'>
              <h2 className='text-2xl font-bold uppercase'>{entry.title}</h2>
              <p>Shop Now</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
