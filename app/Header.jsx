import Image from 'next/image';

export const Header = () => {
  return (
    <header className='pl-4 w-full h-20 flex items-center justify-between fixed top-0 bg-white md:pl-16 md:pr-14'>
      <Image src='/assets/logo.svg' width={50} height={50} alt='brand_logo' />
      <div className='flex gap-2 items-center'>
        <a className='p-2 text-base cursor-pointer'>SHOP</a>
        <a className='p-2 text-base cursor-pointer'>SIGN IN</a>
        <div className='p-2 cursor-pointer flex items-center justify-center relative'>
          <Image src='/assets/shopping-bag.svg' width={24} height={24} alt='bag_icon' />
          <span className='text-[10px] font-bold absolute top-4'>0</span>
        </div>
      </div>
    </header>
  );
};
