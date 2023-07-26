import { IEntity } from '~interfaces/entity.interface';

export interface IFavouritesState {
  loading: boolean;
  favourites: IEntityInState;
}

export interface IFavouritesSlice {
  favourites: IFavouritesState;
}

export interface SetFavouritesPayload {
  favourites: IEntityInState;
}

export interface AddFavouritesPayload {
  entity: IEntity;
}

export interface DeleteFavouritesPayload {
  id: string;
}

export interface IEntityInState {
  [key: string]: IEntity;
}
