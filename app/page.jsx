import Link from 'next/link';

import fetchFromAPI from '@services/api';

const Home = async () => {
  const { collections: homepageCollections } = await fetchFromAPI(
    'services/queries/collections.graphql',
    'homepageCollections'
  );

  return (
    <div
      id='home'
      className='min-h-[calc(100vh-5rem)] flex items-center justify-center'
    >
      <section
        id='categories'
        className='px-4 w-full flex gap-4 flex-wrap justify-between md:px-16'
      >
        {homepageCollections.nodes.map((entry) => (
          <Link
            href={`shop/${entry.handle}`}
            key={entry.id}
            className='group min-w-[30%] h-60 flex-auto flex items-center justify-center border border-black overflow-hidden relative cursor-pointer [&:nth-child(4)]:flex-1 [&:nth-child(5)]:flex-1'
          >
            <img
              src={entry.image.src}
              alt={entry.image.altText}
              className='w-full h-full object-cover -z-10 absolute group-hover:scale-110 transition-all duration-1000'
            />
            <div className='h-24 px-6 flex flex-col items-center gap-4 bg-white border border-black opacity-70 group-hover:opacity-90 transition-all duration-500'>
              <h2 className='text-2xl uppercase font-bold'>{entry.title}</h2>
              <p>Shop Now</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
