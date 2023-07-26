import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MAIN_ROUTES, MainRoutes } from '~navigation/Main/mainTypes';
import { EntityScreen } from '~screens';
import { TabNavigator } from '~navigation/TabNavigator';

const Stack = createNativeStackNavigator<MainRoutes>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name={MAIN_ROUTES.TABS} component={TabNavigator} />
        <Stack.Screen name={MAIN_ROUTES.ENTITY} component={EntityScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
