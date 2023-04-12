import { combineReducers } from '@reduxjs/toolkit';

import cart from './cart/cart.reducer';
import user from './user/user.reducer';

const rootReducer = combineReducers({
  cart,
  user,
});

export default rootReducer;
