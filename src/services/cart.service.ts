import { getCartsStorage, setCartStorage } from '~services/localstorage.service';
import { IProductInCart } from '~store/cart/cartSlice.interface';
import { IEntity } from '~interfaces/entity.interface';

export const getCartService = async (): Promise<IProductInCart[]> => {
  return await getCartsStorage();
};

export const updateQuantityOfProductToCartStorage = async (
  product: IEntity,
  type: 'add' | 'sub' = 'add',
): Promise<IProductInCart[]> => {
  const cart = await getCartsStorage();
  // Get index of product in array
  const productIndex = cart.findIndex((item) => item.entity.id === product.id);

  if (productIndex > -1) {
    if (type === 'add') cart[productIndex].quantity += 1;
    if (type === 'sub') cart[productIndex].quantity -= 1;
  } else {
    const indexOfItem = cart.length + 1;
    cart.unshift({ entity: product, quantity: 1, index: indexOfItem });
  }

  await setCartStorage(cart);

  return cart;
};

export const removeProductFromCartStorage = async (productId: number): Promise<IProductInCart[]> => {
  const cart = await getCartsStorage();
  // Get index of product in array
  const productIndex = cart.findIndex((item) => item.entity.id === productId);

  if (productIndex > -1) {
    cart.splice(productIndex, 1);
  }

  await setCartStorage(cart);

  return cart;
};
