import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFavouritesAsync } from '~store/favourites/favouritesSlice';
import SearchResults from '~screens/Tabs/SearchTab/Search/components/SearchResults';
import { getCartAsync } from '~store/cart/cartSlice';
import { Box, Screen } from '~components';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavouritesAsync());
    dispatch(getCartAsync());
  }, [dispatch]);

  return (
    <Screen full>
      <Box paddingTop="s">
        <SearchResults searchQuery={'home'} />
      </Box>
    </Screen>
  );
};

export default HomeScreen;
