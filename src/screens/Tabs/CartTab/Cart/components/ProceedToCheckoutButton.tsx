import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '~components/atoms/Button';
import { useSelector } from 'react-redux';
import { selectCart } from '~store/cart/cartSlice';
import { CARD_WIDTH_FULL } from '~config/constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { StyleSheet } from 'react-native';
import { Box } from '~components';

export const ProceedToCheckoutButton = () => {
  const cart = useSelector(selectCart);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [label, setLabel] = useState<string>('Proceed to checkout');

  useEffect(() => {
    const total = cart.reduce((acc, cur) => {
      return acc + cur.entity.price * cur.quantity;
    }, 0);
    setSubTotal(total);
    setLabel(`Proceed to checkout | ${total.toFixed(2)} €`);
  }, [cart]);

  const proceedToCheckout = () => {
    navigation.navigate(MAIN_ROUTES.CHECKOUT);
  };

  return (
    <Box style={styles.container}>
      <Button onPress={proceedToCheckout} label={label} width={CARD_WIDTH_FULL} disabled={subTotal === 0} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    zIndex: 100,
  },
});
