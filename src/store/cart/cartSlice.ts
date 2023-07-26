import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '~store/store';
import { ICartSlice, ICartState, IProductInCart, SetCartPayload } from '~store/cart/cartSlice.interface';
import { setCartStorage } from '~services/localstorage.service';
import {
  getCartService,
  removeProductFromCartStorage,
  updateQuantityOfProductToCartStorage,
} from '~services/cart.service';
import { IEntity } from '~interfaces/entity.interface';

const initialState: ICartState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state: ICartState, action: PayloadAction<SetCartPayload>): void => {
      state.cart = action.payload.cart;
    },
    resetCart: (): ICartState => initialState,
  },
});

//////////////////////////////// USER ASYNC ACTIONS ////////////////////////////////

export const getCartAsync =
  (): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    const cart = await getCartService();
    dispatch(setCart({ cart }));
  };

export const addToCartAsync =
  (product: IEntity): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    const updatedCart = await updateQuantityOfProductToCartStorage(product);
    dispatch(setCart({ cart: updatedCart }));
  };

export const changeQuantityOfProductAsync =
  (product: IEntity, type: 'add' | 'sub'): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    const updatedCart = await updateQuantityOfProductToCartStorage(product, type);
    dispatch(setCart({ cart: updatedCart }));
  };

export const removeProductFromCartAsync =
  (productId: number): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    const updatedCart = await removeProductFromCartStorage(productId);
    dispatch(setCart({ cart: updatedCart }));
  };

export const clearCartAsync =
  (): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setCart({ cart: {} }));
    setCartStorage({});
  };

//////////////////////////////// ACTIONS ////////////////////////////////
export const { setCart, resetCart } = cartSlice.actions;

//////////////////////////////// SELECTORS ////////////////////////////////
export const selectCart = (state: ICartSlice): IProductInCart[] => {
  const list = Object.values(state.cart.cart) || [];
  return list.sort((a, b) => b.index - a.index);
};

export const selectProductsInCartLength = createSelector(selectCart, (cart) => {
  return cart.reduce((acc, cur) => acc + cur.quantity, 0);
});

export default cartSlice.reducer;
