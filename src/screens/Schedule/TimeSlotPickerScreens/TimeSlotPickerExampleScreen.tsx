import * as React from 'react';
import { CalendarMain } from '~screens/Schedule/TimeSlotPickerScreens/CalendarMain';
import { StackNavigationProps } from '~navigation/navigation.interface';
import { MainRoutes } from '~navigation/Main/mainTypes';
import { PALETTE } from '~theme/theme';
import ScreenHeader from '../../../components/organisms/ScreenHeader';
import { Screen } from '~components';

const TimeSlotPickerExampleScreen = ({ navigation }: StackNavigationProps<MainRoutes, 'TimeSlotPickerExample'>) => {
  return (
    <Screen full background={PALETTE.WHITE}>
      <ScreenHeader navigation={navigation} options={{ title: 'Schedule appointment' }} />
      <CalendarMain />
    </Screen>
  );
};

export default TimeSlotPickerExampleScreen;
