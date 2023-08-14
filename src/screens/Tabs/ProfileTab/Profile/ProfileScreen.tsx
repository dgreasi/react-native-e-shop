import * as React from 'react';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { Box, Button } from '~components';

const ProfileScreen = ({ navigation }: any) => {
  const navigateToCalendar = () => {
    navigation.push(MAIN_ROUTES.SCHEDULE);
  };

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" flex={1}>
      <Button onPress={navigateToCalendar} label="Open calendar" />
    </Box>
  );
};

export default ProfileScreen;
