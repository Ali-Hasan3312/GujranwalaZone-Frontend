// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productAPI } from './api/productAPI';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [productAPI.reducerPath]: productAPI.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),


});




export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
