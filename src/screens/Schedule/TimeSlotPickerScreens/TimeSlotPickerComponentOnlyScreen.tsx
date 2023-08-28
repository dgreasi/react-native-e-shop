import * as React from 'react';
import { useEffect, useState } from 'react';
import { Screen } from '~components';
import theme, { PALETTE } from '~theme/theme';
import ScreenHeader from '../../../components/organisms/ScreenHeader';
import { StackNavigationProps } from '~navigation/navigation.interface';
import { MainRoutes } from '~navigation/Main/mainTypes';
import { availableDates, bookedData } from '~data/data';
import { IAppointment, TimeSlotPicker } from '@dgreasi/react-native-time-slot-picker';

const TimeSlotPickerComponentOnlyScreen = ({
  navigation,
}: StackNavigationProps<MainRoutes, 'TimeSlotPickerComponentOnly'>) => {
  const [dateOfAppointment, setDateOfAppointment] = useState<IAppointment | null>(null);

  useEffect(() => {
    console.log('Date of appointment updated: ', dateOfAppointment);
  }, [dateOfAppointment]);

  return (
    <Screen full background={PALETTE.WHITE}>
      <ScreenHeader navigation={navigation} options={{ title: 'Schedule appointment' }} />
      <TimeSlotPicker
        availableDates={availableDates}
        setDateOfAppointment={setDateOfAppointment}
        scheduledAppointment={bookedData}
        marginTop={24}
        // datePickerBackgroundColor="#F4CC58"
        // timeSlotsBackgroundColor="#F4CC58"
        mainColor={theme.colors.error300}
        // timeSlotWidth={160}
      />
    </Screen>
  );
};

export default TimeSlotPickerComponentOnlyScreen;
