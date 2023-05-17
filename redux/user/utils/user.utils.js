export function handleSetCurrentUser(state, { payload }) {
  state.currentUser = {
    token: payload.accessToken,
    display_name: payload.displayName,
    email: payload.email,
  };
}

export function handleUserSignOut(state) {
  state.currentUser = {};
}
