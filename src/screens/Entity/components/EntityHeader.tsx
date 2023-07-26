import React, { useCallback } from 'react';
import { Box } from '~components';
import { hasNotch } from 'react-native-device-info';
import { isIOS } from '~utils/deviceInfo';
import RoundButton from '~components/atoms/RoundButton';
import { useNavigation } from '@react-navigation/native';

const EntityHeader = () => {
  const navigation = useNavigation();

  const getTop = useCallback(() => {
    if (isIOS && hasNotch()) return 48;
    else return 32;
  }, []);

  return (
    <Box
      paddingHorizontal="m"
      position="absolute"
      top={getTop()}
      zIndex={1}
      flexDirection="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between">
      <RoundButton icon="ic_24_arrow-left" onPress={navigation.goBack} />

      {/*<RoundButton icon="ic_24_share" onPress={favButton} />*/}
    </Box>
  );
};

export default EntityHeader;
