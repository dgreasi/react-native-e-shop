import AsyncStorage from '@react-native-async-storage/async-storage';
import { IEntityInState } from '~store/favourites/favouritesSlice.interface';
import { IProductInCart } from '~store/cart/cartSlice.interface';

export const setFavouritesStorage = async (favourites: IEntityInState): Promise<void> => {
  try {
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  } catch (e) {
    console.error('Error while saving favourite');
  }
};

export const getFavouritesStorage = async (): Promise<IEntityInState> => {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    return favourites !== null ? JSON.parse(favourites) : {};
  } catch (e) {
    console.error('Error while getting favourite');
    return {};
  }
};

export const setCartStorage = async (cart: IProductInCart[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Error while saving cart');
  }
};

export const getCartsStorage = async (): Promise<IProductInCart[]> => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    return cart !== null ? JSON.parse(cart) : [];
  } catch (e) {
    console.error('Error while getting cart');
    return [];
  }
};

export const getRecentSearchesStorage = async (): Promise<string[]> => {
  try {
    return JSON.parse((await AsyncStorage.getItem('recentSearches')) || '[]');
  } catch (e) {
    console.error('Error while getting recent searches of products');
    return [];
  }
};
