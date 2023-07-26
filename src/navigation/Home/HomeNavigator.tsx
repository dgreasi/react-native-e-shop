import React from 'react';
import { HOME_ROUTES, HomeRoutes } from '~navigation/Home/homeTypes';
import { HomeScreen } from '~screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHeader from '../../components/organisms/ScreenHeader';

const HomeStack = createNativeStackNavigator<HomeRoutes>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HOME_ROUTES.HOME}
        component={HomeScreen}
        options={() => ({
          title: 'Welcome to e-shop',
          header: (props) => <ScreenHeader {...props} />,
        })}
      />
    </HomeStack.Navigator>
  );
};
