const categories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens',
  },
];

const Home = () => {
  return (
    <div
      id='home'
      className='min-h-[calc(100vh-5rem)] flex items-center justify-center'
    >
      <section
        id='categories'
        className='px-4 w-full flex gap-4 flex-wrap justify-between md:px-16'
      >
        {categories.map((entry) => (
          <div
            key={entry.id}
            className='group min-w-[30%] h-60 flex-auto flex items-center justify-center border border-black overflow-hidden relative cursor-pointer [&:nth-child(4)]:flex-1 [&:nth-child(5)]:flex-1'
          >
            <img
              src={entry.imageUrl}
              className='w-full h-full object-cover -z-10 absolute group-hover:scale-110 transition-all duration-1000'
            />
            <div className='h-24 px-6 flex flex-col items-center gap-4 bg-white border border-black opacity-70 group-hover:opacity-90 transition-all duration-500'>
              <h2 className='text-2xl uppercase font-bold'>{entry.title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
