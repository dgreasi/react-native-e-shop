import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetBooleanPayload } from '~interfaces/store.interface';
import { AppDispatch, AppThunk, RootStoreInterface } from '~store/store';
import { batch } from 'react-redux';
import {
  AddFavouritesPayload,
  DeleteFavouritesPayload,
  IEntityInState,
  IFavouritesSlice,
  IFavouritesState,
  SetFavouritesPayload,
} from '~store/favourites/favouritesSlice.interface';
import { getFavouritesService } from '~services/favourites.service';
import { IEntity } from '~interfaces/entity.interface';
import { setCoreLoading } from '~store/core/coreSlice';
import { setFavouritesStorage } from '~services/localstorage.service';

const initialState: IFavouritesState = {
  loading: false,
  favourites: {},
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavouritesLoading: (state: IFavouritesState, action: PayloadAction<SetBooleanPayload>): void => {
      state.loading = action.payload.value;
    },
    addFavourite: (state: IFavouritesState, action: PayloadAction<AddFavouritesPayload>): void => {
      const entity = action.payload.entity;
      state.favourites = { ...state.favourites, [entity.id]: entity };
    },
    deleteFavourite: (state: IFavouritesState, action: PayloadAction<DeleteFavouritesPayload>): void => {
      delete state.favourites[action.payload.id];
    },
    setFavourites: (state: IFavouritesState, action: PayloadAction<SetFavouritesPayload>): void => {
      state.favourites = action.payload.favourites;
    },
    resetFavourites: (): IFavouritesState => initialState,
  },
});

//////////////////////////////// USER ASYNC ACTIONS ////////////////////////////////

export const getFavouritesAsync =
  (): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setCoreLoading({ value: true }));

    // Get new posts
    const resp = await getFavouritesService();

    // Dispatch actions together to prevent unneeded re-renders
    batch(() => {
      dispatch(setFavourites({ favourites: resp }));
      dispatch(setCoreLoading({ value: false }));
    });
  };

export const deleteFavouriteAsync =
  (entityId: number): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootStoreInterface): Promise<void> => {
    const favourites = { ...getState().favourites.favourites };
    delete favourites[entityId];
    dispatch(setFavourites({ favourites }));
    setFavouritesStorage(favourites);
  };

export const addFavouriteAsync =
  (entity: IEntity): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootStoreInterface): Promise<void> => {
    const favourites = { [entity.id]: entity, ...getState().favourites.favourites };

    dispatch(setFavourites({ favourites }));
    setFavouritesStorage(favourites);
  };

//////////////////////////////// ACTIONS ////////////////////////////////
export const { setFavouritesLoading, addFavourite, deleteFavourite, setFavourites, resetFavourites } =
  favouritesSlice.actions;

//////////////////////////////// SELECTORS ////////////////////////////////
export const selectFavouritesLoading = (state: IFavouritesSlice): boolean => state.favourites.loading;
export const selectFavourites = (state: IFavouritesSlice): IEntityInState => state.favourites.favourites;

export default favouritesSlice.reducer;
