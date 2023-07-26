import AsyncStorage from '@react-native-async-storage/async-storage';
import { IEntityInState } from '~store/favourites/favouritesSlice.interface';
import { ICartInState } from '~store/cart/cartSlice.interface';

export const setFavouritesStorage = async (favourites: IEntityInState): Promise<void> => {
  try {
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  } catch (e) {
    console.error('Error while saving favourite movies');
  }
};

export const getFavouritesStorage = async (): Promise<IEntityInState> => {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    return favourites !== null ? JSON.parse(favourites) : {};
  } catch (e) {
    console.error('Error while getting favourite movies');
    return {};
  }
};

export const setCartStorage = async (ids: ICartInState): Promise<void> => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(ids));
  } catch (e) {
    console.error('Error while saving hidden movies');
  }
};

export const getCartsStorage = async (): Promise<ICartInState> => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    return cart !== null ? JSON.parse(cart) : {};
  } catch (e) {
    console.error('Error while getting hidden movies');
    return {};
  }
};

export const getRecentSearchesStorage = async (): Promise<string[]> => {
  try {
    return JSON.parse((await AsyncStorage.getItem('recentSearches')) || '[]');
  } catch (e) {
    console.error('Error while getting recent searches of shops');
    return [];
  }
};
