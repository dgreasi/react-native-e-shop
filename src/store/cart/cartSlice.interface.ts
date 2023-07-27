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
  index: number;
}

export interface SetCartPayload {
  cart: IProductInCart[];
}
