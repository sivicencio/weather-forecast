import { combineReducers } from 'redux';
import forecastApi from '../../api/forecast';
import selection from './selection/selectionSlice';

const rootReducer = combineReducers({
  [forecastApi.reducerPath]: forecastApi.reducer,
  selection,
});

export default rootReducer;
