import * as React from 'react';
import { CalendarMain } from '~screens/Schedule/components/CalendarMain';
import { StackNavigationProps } from '~navigation/navigation.interface';
import { MainRoutes } from '~navigation/Main/mainTypes';
import { PALETTE } from '~theme/theme';
import { Screen } from '~components/layout/Screen';
import ScreenHeader from '../../components/organisms/ScreenHeader';

export const TimeSlotPickerScreen = ({ navigation }: StackNavigationProps<MainRoutes, 'TimeSlotPicker'>) => {
  return (
    <Screen full background={PALETTE.WHITE}>
      <ScreenHeader navigation={navigation} options={{ title: 'Schedule appointment' }} />
      <CalendarMain />
    </Screen>
  );
};
