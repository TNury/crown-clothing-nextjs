import { createSlice } from '@reduxjs/toolkit';

import { handleCartItemAddition } from './utils/cart.utils';

const initialState = {
  items: [],
  itemsQuantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: handleCartItemAddition,
    removeItem: (state) => {
      state.itemsQuantity -= 1;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
