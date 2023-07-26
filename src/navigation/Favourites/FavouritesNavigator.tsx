import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAVOURITES_ROUTES, FavouritesRoutes } from '~navigation/Favourites/favouritesTypes';
import { FavouritesScreen } from '~screens';
import ScreenHeader from '../../components/organisms/ScreenHeader';

const FavouritesStack = createNativeStackNavigator<FavouritesRoutes>();

export const FavouritesNavigator = () => {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name={FAVOURITES_ROUTES.FAVOURITES}
        component={FavouritesScreen}
        options={() => ({
          title: 'Favourites',
          header: (props) => <ScreenHeader {...props} noShadow />,
        })}
      />
    </FavouritesStack.Navigator>
  );
};
