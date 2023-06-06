'use client';

import { useEffect } from 'react';

import { Provider, useDispatch } from 'react-redux';

import { store } from '@/redux/store';

import Cookies from 'js-cookie';

const StateHydrator = () => {
  const storedCartReducer = Cookies.get('cartReducer');
  const storedUserReducer = Cookies.get('userReducer');

  const returnAsObject = (jsonString) => {
    return JSON.parse(jsonString);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {};

    if (storedCartReducer) {
      payload.cartReducer = returnAsObject(storedCartReducer);
    }

    if (storedUserReducer) {
      payload.userReducer = returnAsObject(storedUserReducer);
    }

    dispatch({
      type: 'HYDRATE',
      payload,
    });
  }, []);

  return null;
};

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <StateHydrator />
      {children}
    </Provider>
  );
};
