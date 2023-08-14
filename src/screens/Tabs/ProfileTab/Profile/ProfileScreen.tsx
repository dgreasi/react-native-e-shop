import * as React from 'react';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { Box, Button } from '~components';

const ProfileScreen = ({ navigation }: any) => {
  const navigateToCalendar = () => {
    navigation.push(MAIN_ROUTES.TIME_SLOT_PICKER_MODAL);
  };

  const navigateToTimeSlotPicker = () => {
    navigation.push(MAIN_ROUTES.TIME_SLOT_PICKER);
  };

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" flex={1}>
      <Box marginBottom="s" width="100%">
        <Button onPress={navigateToTimeSlotPicker} label="Open time slot picker" />
      </Box>
      <Button onPress={navigateToCalendar} label="Open modal calendar" />
    </Box>
  );
};

export default ProfileScreen;
