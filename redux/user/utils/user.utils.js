import Cookies from 'js-cookie';

export function handleSetCurrentUser(state, { payload }) {
  state.currentUser = {
    token: payload.accessToken,
    display_name: payload.displayName,
    email: payload.email,
  };

  Cookies.set('userReducer', JSON.stringify(state));
}

export function handleUserSignOut(state) {
  state.currentUser = {};

  Cookies.set('userReducer', JSON.stringify(state));
}
