import * as React from 'react';
import { IEntity } from '~interfaces/entity.interface';
import { Box, Text } from '~components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '~theme/theme';
import { addToCartAsync } from '~store/cart/cartSlice';
import { useDispatch } from 'react-redux';

interface Props {
  entity: IEntity;
}

export const EntityPriceSection = ({ entity }: Props) => {
  const dispatch = useDispatch();

  const onPressAddToCart = () => {
    dispatch(addToCartAsync(entity));
  };

  return (
    <Box style={styles.container}>
      <Text variant="oswald" color="primary800">
        {entity.price} €
      </Text>

      <TouchableOpacity onPress={onPressAddToCart} activeOpacity={0.5}>
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
});
