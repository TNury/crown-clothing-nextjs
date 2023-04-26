import { createSlice } from '@reduxjs/toolkit';

import { handleSetCurrentUser, handleUserSignOut } from './utils/user.utils';

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: handleSetCurrentUser,
    signUserOut: handleUserSignOut,
  },
  extraReducers: (builder) => {
    builder.addCase('HYDRATE', (state, action) => {
      return {
        ...state,
        ...action.payload.userReducer,
      };
    });
  },
});

export const { setCurrentUser, signUserOut } = userSlice.actions;

export default userSlice.reducer;
