import * as React from 'react';
import { CalendarMain } from '~screens/Schedule/TimeSlotPickerScreens/CalendarMain';
import { StackNavigationProps } from '~navigation/navigation.interface';
import { MainRoutes } from '~navigation/Main/mainTypes';
import { PALETTE } from '~theme/theme';
import ScreenHeader from '../../../components/organisms/ScreenHeader';
import { Screen } from '~components';

/**
 * A screen with header, drag to refresh, get data functionality from API and a submit button,
 * that uses react-native-time-slot-picker and simulates a request
 * to get the needed data that will be displayed in the component.
 * A `Book` button is added, with a loader when tapped, to simulate a UX example.
 * @param navigation
 * @constructor
 */
const TimeSlotPickerExampleScreen = ({ navigation }: StackNavigationProps<MainRoutes, 'TimeSlotPickerExample'>) => {
  return (
    <Screen full background={PALETTE.WHITE}>
      <ScreenHeader navigation={navigation} options={{ title: 'Schedule appointment' }} />
      <CalendarMain />
    </Screen>
  );
};

export default TimeSlotPickerExampleScreen;
