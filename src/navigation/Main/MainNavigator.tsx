import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MAIN_ROUTES, MainRoutes } from '~navigation/Main/mainTypes';
import {
  CheckoutScreen,
  EntityScreen,
  TimeSlotPickerComponentOnlyScreen,
  TimeSlotPickerExampleScreen,
  TimeSlotPickerModalScreen,
} from '~screens';
import { TabNavigator } from '~navigation/TabNavigator';

const Stack = createNativeStackNavigator<MainRoutes>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name={MAIN_ROUTES.TABS} component={TabNavigator} />
        <Stack.Screen name={MAIN_ROUTES.ENTITY} component={EntityScreen} />
        <Stack.Screen name={MAIN_ROUTES.CHECKOUT} component={CheckoutScreen} />
        <Stack.Screen name={MAIN_ROUTES.TIME_SLOT_PICKER_EXAMPLE} component={TimeSlotPickerExampleScreen} />
        <Stack.Screen
          name={MAIN_ROUTES.TIME_SLOT_PICKER_COMPONENT_ONLY}
          component={TimeSlotPickerComponentOnlyScreen}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name={MAIN_ROUTES.TIME_SLOT_PICKER_MODAL} component={TimeSlotPickerModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
