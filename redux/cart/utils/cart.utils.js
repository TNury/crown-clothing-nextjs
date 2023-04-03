export function handleCartItemAddition(state, action) {
  const { id, name, price, imageUrl } = action.payload;

  const existingItem = state.items.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.items.push({
      id,
      name,
      price,
      imageUrl,
      quantity: 1,
    });
  }

  state.itemsQuantity++;
  state.total += price;
}
