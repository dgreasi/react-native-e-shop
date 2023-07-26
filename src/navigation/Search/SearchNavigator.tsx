import React from 'react';
import { SEARCH_ROUTES, SearchRoutes } from '~navigation/Search/searchTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '~screens';
import ScreenHeader from '../../components/organisms/ScreenHeader';

const SearchStack = createNativeStackNavigator<SearchRoutes>();

export const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={SEARCH_ROUTES.SEARCH}
        component={SearchScreen}
        options={{ header: (props) => <ScreenHeader {...props} noShadow /> }}
      />
    </SearchStack.Navigator>
  );
};
