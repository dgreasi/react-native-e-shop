import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { isAndroid } from '~utils/deviceInfo';
import { useHeaderHeight } from '@react-navigation/elements';
import { Box } from '~components';

interface Props {
  children: React.ReactNode;
  full?: boolean;
  testID?: string;
  paddingTop?: number;
  barStyle?: StatusBarStyle;
}

export const Screen = ({ children, full, testID, paddingTop, barStyle }: Props) => {
  // Bug of react-navigation 6 and reanimated
  // Issue: https://github.com/software-mansion/react-native-reanimated/issues/2906
  const headerHeight = useHeaderHeight();
  const fixAndroidPaddingTop = isAndroid ? headerHeight : 0;

  return (
    <Box
      flex={1}
      bg="background"
      testID={testID}
      flexDirection="column"
      paddingHorizontal={full ? undefined : 'm'}
      style={{ paddingTop: fixAndroidPaddingTop || paddingTop || undefined }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={barStyle || 'dark-content'} />
      {children}
    </Box>
  );
};
