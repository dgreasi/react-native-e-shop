import { IEntity } from '~interfaces/entity.interface';

export interface ICartState {
  cart: Record<number, IProductInCart>;
}

export interface ICartSlice {
  cart: ICartState;
}

export interface IProductInCart {
  entity: IEntity;
  quantity: number;
  index: number;
}

export interface ICartInState {
  [key: number]: IProductInCart;
}

export interface SetCartPayload {
  cart: Record<number, IProductInCart>;
}
