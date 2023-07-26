import { IEntity } from '~interfaces/entity.interface';

export interface ICartState {
  cart: IProductInCart[];
}

export interface ICartSlice {
  cart: ICartState;
}

export interface IProductInCart {
  entity: IEntity;
  quantity: number;
}

export interface ICartInState {
  [key: number]: IProductInCart;
}

export interface SetCartPayload {
  cart: IProductInCart[];
}
