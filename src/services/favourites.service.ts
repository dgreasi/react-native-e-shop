import { IEntityInState } from '~store/favourites/favouritesSlice.interface';
import { getFavouritesStorage } from '~services/localstorage.service';

export const getFavouritesService = async (): Promise<IEntityInState> => {
  return await getFavouritesStorage();
};
