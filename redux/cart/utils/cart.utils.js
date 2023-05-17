// import Cookies from 'js-cookie';

export function handleAddition(cart, action) {
  const { id, name, price, imageUrl } = action.payload;

  const existingItem = cart.items.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({
      id,
      name,
      price,
      imageUrl,
      quantity: 1,
    });
  }

  cart.itemsQuantity++;
  cart.total += price;

  // Cookies.set('cartReducer', JSON.stringify(cart));
}

export function handleRemoval(cart, action) {
  const { id, price } = action.payload;

  cart.items = cart.items.filter((item) => item.id !== id);

  cart.itemsQuantity--;
  cart.total -= price;

  // Cookies.set('cartReducer', cart);
}

export function handleQuantityDecrease(cart, action) {
  const { id, price } = action.payload;

  const existingItem = cart.items.find((item) => item.id === id);

  if (existingItem.quantity > 1) {
    existingItem.quantity--;
  } else {
    cart.items = cart.items.filter((item) => item.id !== id);
  }

  cart.itemsQuantity--;
  cart.total -= price;

  // Cookies.set('cartReducer', cart);
}
