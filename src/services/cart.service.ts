import { getCartsStorage, setCartStorage } from '~services/localstorage.service';
import { ICartInState, IProductInCart } from '~store/cart/cartSlice.interface';
import { IEntity } from '~interfaces/entity.interface';

export const getCartService = async (): Promise<IProductInCart[]> => {
  const cart = await getCartsStorage();
  return Object.values(cart);
};

export const updateQuantityOfProductToCartStorage = async (
  product: IEntity,
  type: 'add' | 'sub' = 'add',
): Promise<ICartInState> => {
  const cart = await getCartsStorage();
  // Get index of product in array
  const productInCart = cart[product.id];

  if (productInCart) {
    if (type === 'add') productInCart.quantity += 1;
    if (type === 'sub') productInCart.quantity -= 1;
  } else {
    const indexOfItem = Object.keys(cart).length + 1;
    cart[product.id] = { entity: product, quantity: 1, index: indexOfItem };
  }

  await setCartStorage(cart);

  return cart;
};

export const removeProductFromCartStorage = async (productId: number): Promise<ICartInState> => {
  const cart = await getCartsStorage();
  // Get index of product in array
  const productInCart = cart[productId];

  if (productInCart) {
    delete cart[productId];
  }

  await setCartStorage(cart);

  return cart;
};
