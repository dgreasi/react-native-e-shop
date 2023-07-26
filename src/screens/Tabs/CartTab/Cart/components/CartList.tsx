import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { selectCart } from '~store/cart/cartSlice';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import theme from '~theme/theme';
import { FULL_HEIGHT } from '~config/constants';
import { Box, Text } from '~components';
import { IProductInCart } from '~store/cart/cartSlice.interface';
import EntityInCart from '~screens/Tabs/CartTab/Cart/components/EntityInCart';

export const CartList = () => {
  const cart = useSelector(selectCart);

  const Separator = () => useMemo(() => <Box style={styles.separator} />, []);

  const keyExtractor = useCallback((item: IProductInCart) => String(item.entity.id), []);

  const renderFavourites = useCallback(({ item, index }: IRender) => {
    return <EntityInCart entity={item.entity} index={index} quantity={item.quantity} />;
  }, []);

  return (
    <FlatList
      ListEmptyComponent={
        <Box style={styles.noContent}>
          <Text variant="oswald">Cart is empty</Text>
        </Box>
      }
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={Separator}
      data={cart}
      renderItem={renderFavourites}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      columnWrapperStyle={undefined}
    />
  );
};

interface IRender {
  item: IProductInCart;
  index: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl * 2,
  },
  separator: {
    height: theme.spacing.m,
  },
  footerLoading: {
    marginTop: theme.spacing.l,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContent: {
    height: FULL_HEIGHT - 160,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1000,
  },
});
