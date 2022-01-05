import { combineReducers } from 'redux';
import selection from './selection/selectionSlice';

const rootReducer = combineReducers({
  selection,
});

export default rootReducer;
