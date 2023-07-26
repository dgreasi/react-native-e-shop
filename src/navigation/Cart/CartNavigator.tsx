import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CART_ROUTES, CartRoutes } from '~navigation/Cart/cartTypes';
import ScreenHeader from '~components/organisms/ScreenHeader';
import { CartScreen } from '~screens';

const CartStack = createNativeStackNavigator<CartRoutes>();

export const CartNavigator = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name={CART_ROUTES.CART}
        component={CartScreen}
        options={() => ({
          title: 'Shopping bag',
          header: (props) => <ScreenHeader {...props} />,
        })}
      />
    </CartStack.Navigator>
  );
};
