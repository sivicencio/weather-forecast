/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import forecastApi from '../api/forecast';
import rootReducer from './modules';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(forecastApi.middleware),
});
