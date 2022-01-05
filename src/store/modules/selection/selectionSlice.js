/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forecast: undefined,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    updateForecastSelection: (state, action) => {
      state.forecast = action.payload;
    },
  },
});

export const { updateForecastSelection } = selectionSlice.actions;

export default selectionSlice.reducer;
