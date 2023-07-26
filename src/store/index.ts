import { combineReducers } from '@reduxjs/toolkit';
import coreReducer from './core/coreSlice';
import favouritesReducer from './favourites/favouritesSlice';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({
  core: coreReducer,
  favourites: favouritesReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
