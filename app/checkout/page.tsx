const Checkout: React.FC = () => {
  return (
    <main className='flex min-h-[calc(100vh-5rem)] w-full flex-col items-center px-4 py-16'>
      <div className='flex w-1/2 flex-col gap-4'>
        <div className='flex border-b border-darkgray py-2 text-center'>
          <span className='w-[23%] text-xl'>Product</span>
          <span className='w-[23%] text-xl'>Description</span>
          <span className='w-[23%] text-xl'>Quantity</span>
          <span className='w-[23%] text-xl'>Price</span>
          <span className='w-[23%] text-xl'>Remove</span>
        </div>
        <div className='flex flex-col'>
          {/* {cartProps.items.map((item, index) => (
            <div
              key={index}
              className='flex items-center border-b border-darkgray py-4 text-center'>
              <img src={item.imageUrl} className='w-[23%]' />
              <div className='flex w-[23%] items-center justify-center'>
                <p className='text-xl'>{item.name}</p>
              </div>
              <div className='flex w-[23%] items-center justify-center gap-2'>
                <button className='cursor-pointer px-2'>&#10094;</button>
                <p className='w-4 text-xl'>{item.quantity}</p>
                <button className='cursor-pointer px-2'>&#10095;</button>
              </div>
              <div className='flex w-[23%] items-center justify-center'>
                <p className='text-xl'>€{item.price}</p>
              </div>
              <div className='flex w-[23%] items-center justify-center'>
                <button className='px-2 text-xl'>&#10005;</button>
              </div>
            </div>
          ))} */}
        </div>
        <div className='ml-auto mt-8'>
          <span className='text-4xl'>Total: €0</span>
        </div>
      </div>
    </main>
  );
};

export default Checkout;