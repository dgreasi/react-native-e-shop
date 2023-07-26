import * as React from 'react';
import { Box } from '~components';
import FavouritesList from '~screens/Tabs/HomeTab/Home/components/FavouritesList';
import { Screen } from '~components/layout/Screen';

const FavouritesScreen = () => {
  return (
    <Screen full>
      <Box paddingTop="s">
        <FavouritesList />
      </Box>
    </Screen>
  );
};

export default FavouritesScreen;
