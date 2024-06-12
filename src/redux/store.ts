// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productAPI } from './api/productAPI';

import { userAPI } from './api/userAPI';
import { cartReducer } from './reducer/cartReducer';
import { orderApi } from './api/orderAPI';
import { userReducer } from './reducer/userReducer';
import { dashboardApi } from './api/dashboardAPI';

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
   
    [productAPI.reducerPath]: productAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [dashboardApi.reducerPath]:dashboardApi.reducer
  },
  middleware: (mid)=>[
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderApi.middleware,
    dashboardApi.middleware
  ]
});




export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
