import { createSlice } from '@reduxjs/toolkit';

import { handleSetCurrentUser } from './utils/user.utils';

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: handleSetCurrentUser,
    signUserOut: (state) => {
      state.currentUser = {};
    },
  },
});

export const { setCurrentUser, signUserOut } = userSlice.actions;

export default userSlice.reducer;
