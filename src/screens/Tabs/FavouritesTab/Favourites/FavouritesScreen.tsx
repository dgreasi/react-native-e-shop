import * as React from 'react';
import { Box, Screen } from '~components';
import FavouritesList from '~screens/Tabs/HomeTab/Home/components/FavouritesList';

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
