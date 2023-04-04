const CartPreview = ({ cartItems }) => {
  return (
    <div className='w-60 h-96 p-4 flex flex-col gap-4 absolute right-14 top-20 border border-black bg-white'>
      <div className='flex flex-col gap-4 overflow-auto overscroll-contain'>
        {cartItems.map((item) => (
          <div className='flex w-full h-20'>
            <img src={item.imageUrl} className='w-1/3 h-full object-cover' />
            <div className='p-4'>
              <p>{item.name}</p>
              <p>
                {item.quantity} x €{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className='w-full p-4 mt-auto bg-black border border-black text-base font-bold uppercase transition-all duration-200 text-white hover:bg-white hover:text-black'>
        Checkout
      </button>
    </div>
  );
};

export default CartPreview;
