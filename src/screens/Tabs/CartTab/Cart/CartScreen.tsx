import * as React from 'react';
import { Box } from '~components';
import { CartList } from '~screens/Tabs/CartTab/Cart/components/CartList';
import { Screen } from '~components/layout/Screen';
import { ProceedToCheckoutButton } from '~screens/Tabs/CartTab/Cart/components/ProceedToCheckoutButton';

const CartScreen = () => {
  return (
    <Screen full>
      <Box paddingTop="s">
        <CartList />
      </Box>
      <ProceedToCheckoutButton />
    </Screen>
  );
};

export default CartScreen;
