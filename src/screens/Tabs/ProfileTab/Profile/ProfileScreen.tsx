import * as React from 'react';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { Box, Button } from '~components';

const ProfileScreen = ({ navigation }: any) => {
  const navigateToCalendar = () => {
    navigation.push(MAIN_ROUTES.TIME_SLOT_PICKER_MODAL);
  };

  const navigateToTimeSlotPicker = () => {
    navigation.push(MAIN_ROUTES.TIME_SLOT_PICKER_EXAMPLE);
  };

  const navigateToTimeSlotPickerComponent = () => {
    navigation.push(MAIN_ROUTES.TIME_SLOT_PICKER_COMPONENT_ONLY);
  };

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" flex={1}>
      <Box marginBottom="s" width="100%">
        <Button onPress={navigateToTimeSlotPickerComponent} label="Open time slot picker component" />
      </Box>
      <Box marginBottom="s" width="100%">
        <Button onPress={navigateToTimeSlotPicker} label="Open time slot picker example" />
      </Box>
      <Button onPress={navigateToCalendar} label="Open modal calendar" />
    </Box>
  );
};

export default ProfileScreen;
