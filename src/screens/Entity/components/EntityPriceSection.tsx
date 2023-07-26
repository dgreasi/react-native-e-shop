import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { IEntity } from '~interfaces/entity.interface';
import { Box, Text } from '~components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '~theme/theme';
import { addToCartAsync, selectCart } from '~store/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  entity: IEntity;
}

export const EntityPriceSection = ({ entity }: Props) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [quantityInCart, setQuantityInCart] = useState<number>(0);

  useEffect(() => {
    const findIndex = cart.findIndex((item) => item.entity.id === entity.id);
    if (findIndex > -1) {
      setQuantityInCart(cart[findIndex]?.quantity || 0);
      return;
    }

    setQuantityInCart(0);
  }, [cart, entity.id]);

  const onPressAddToCart = () => {
    dispatch(addToCartAsync(entity));
  };

  const getQuantityInCart = useCallback(() => {
    if (quantityInCart > 0) {
      return (
        <Text variant="oswald" color="primary700" fontWeight="700" paddingRight="s">
          ({quantityInCart})
        </Text>
      );
    }

    return null;
  }, [quantityInCart]);

  return (
    <Box style={styles.container}>
      <Text variant="oswald" color="primary800">
        {entity.price} €
      </Text>

      <TouchableOpacity onPress={onPressAddToCart} activeOpacity={0.5} style={styles.addToCart}>
        {getQuantityInCart()}
        <Text color="buttonSecondary" variant="oswald">
          Add to cart
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
