import * as React from 'react';
import { Box, Text } from '~components';
import { Screen } from '~components/layout/Screen';
import EntityHeader from '~screens/Entity/components/EntityHeader';
import { StyleSheet } from 'react-native';

const CheckoutScreen = () => {
  return (
    <Screen full>
      <Box style={styles.container} height="100%">
        <EntityHeader />
        <Text variant="oswald" textAlign="center">
          Checkout page
        </Text>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckoutScreen;
