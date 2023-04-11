'use client';

import { useSelector, useDispatch } from 'react-redux';
import { addItem, decreaseQuantity, removeItem } from 'redux/cart/cart.reducer';

const Checkout = () => {
  const cartProps = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const triggerAddition = (itemData) => {
    dispatch(addItem(itemData));
  };

  const triggerQuantityDecrease = (itemData) => {
    dispatch(decreaseQuantity(itemData));
  };

  const triggerItemRemoval = (itemData) => {
    dispatch(removeItem(itemData));
  };

  return (
    <main className='w-full min-h-[calc(100vh-5rem)] px-4 py-16 flex flex-col items-center'>
      <div className='w-1/2 flex flex-col gap-4'>
        <div className='py-2 flex border-b border-darkgray text-center'>
          <span className='w-[23%] text-xl'>Product</span>
          <span className='w-[23%] text-xl'>Description</span>
          <span className='w-[23%] text-xl'>Quantity</span>
          <span className='w-[23%] text-xl'>Price</span>
          <span className='w-[23%] text-xl'>Remove</span>
        </div>
        <div className='flex flex-col'>
          {cartProps.items.map((item, index) => (
            <div
              key={index}
              className='flex items-center text-center py-4 border-b border-darkgray'
            >
              <img src={item.imageUrl} className='w-[23%]' />
              <div className='w-[23%] flex items-center justify-center'>
                <p className='text-xl'>{item.name}</p>
              </div>
              <div className='w-[23%] flex items-center gap-2 justify-center'>
                <button
                  onClick={() => triggerQuantityDecrease(item)}
                  className='cursor-pointer px-2'
                >
                  &#10094;
                </button>
                <p className='text-xl w-4'>{item.quantity}</p>
                <button
                  onClick={() => triggerAddition(item)}
                  className='cursor-pointer px-2'
                >
                  &#10095;
                </button>
              </div>
              <div className='w-[23%] flex items-center justify-center'>
                <p className='text-xl'>€{item.price}</p>
              </div>
              <div className='w-[23%] flex items-center justify-center'>
                <button
                  onClick={() => triggerItemRemoval(item)}
                  className='px-2 text-xl'
                >
                  &#10005;
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='ml-auto mt-8'>
          <span className='text-4xl'>Total: €{cartProps.total}</span>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
