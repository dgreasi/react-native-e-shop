import * as React from 'react';
import { IProductInCart } from '~store/cart/cartSlice.interface';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Icon, Text } from '~components';
import theme from '~theme/theme';

interface Props {
  product: IProductInCart;
  minus: () => void;
  add: () => void;
}

export const QuantityPicker = ({ product, minus, add }: Props) => {
  return (
    <Box
      style={styles.container}
      borderWidth={1}
      borderColor="primary400"
      width={120}
      height={30}
      borderRadius="ml"
      flexDirection="row"
      alignItems="center">
      <Box width="35%" borderRadius="ml">
        <TouchableOpacity disabled={product?.quantity === 1} onPress={minus} style={styles.btn}>
          <Icon
            name="ic_24_minus"
            size={20}
            color={product?.quantity === 1 ? theme.colors.primary400 : theme.colors.primary900}
          />
        </TouchableOpacity>
      </Box>
      <Box width="30%" alignItems="center" justifyContent="center">
        <Text variant="body1">{product?.quantity}</Text>
      </Box>
      <Box width="35%" borderRadius="ml">
        <TouchableOpacity onPress={add} style={styles.btn}>
          <Icon name="ic_24_plus" size={20} color={theme.colors.primary900} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    elevation: 1,
  },
  btn: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadii.ml,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
