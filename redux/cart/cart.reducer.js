import { createSlice } from '@reduxjs/toolkit';

import {
  handleAddition,
  handleRemoval,
  handleQuantityDecrease,
} from './utils/cart.utils';

const initialState = {
  items: [],
  itemsQuantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: handleAddition,
    removeItem: handleRemoval,
    decreaseQuantity: handleQuantityDecrease,
  },
});

export const { addItem, removeItem, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
