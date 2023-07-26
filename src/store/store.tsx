import { Action, configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './index';
import createDebugger from 'redux-flipper';
import React from 'react';
import { Provider as RNProvider } from 'react-redux';
import { ICoreState } from '~store/core/coreSlice.interface';
import { IFavouritesState } from '~store/favourites/favouritesSlice.interface';
import { ICartState } from '~store/cart/cartSlice.interface';

export interface RootStoreInterface {
  core: ICoreState;
  favourites: IFavouritesState;
  cart: ICartState;
}

let store: EnhancedStore<any, any, any>;
if (__DEV__ && !process.env.JEST_WORKER_ID) {
  store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createDebugger()),
  });
} else {
  store = configureStore({
    reducer: rootReducer,
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const Provider = ({ children }: { children: React.ReactNode }) => (
  <RNProvider store={store}>{children}</RNProvider>
);

export default store;
